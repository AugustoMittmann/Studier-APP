import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, ListGroup } from 'react-bootstrap'
import './css.css';
import { useState } from 'react';
import axios from 'axios';

function Header(props) {
  const[loginModal, setLoginModal] = useState(false);
  const[historyModal, setHistoryModal] = useState(false);
  const[historyDetailsModal, setHistoryDetailsModal] = useState(false);
  const[historyDetailsId, setHistoryDetailsId] = useState('');
  const[historyToShow, setHistoryToShow] = useState('');

  const onClickCreate = () => {
    const name = document.getElementById('formBasicUser');
    const password = document.getElementById('formBasicPassword');
    if(name.value === '' || password.value === '') {
      alert("Preencha todos os campos");
      return;
    }

      axios.get('https://studier-server.onrender.com/create', {
      //axios.get('http://localhost:4000/create', {
        params: {
          name: name.value,
          password: password.value
        }
      })
      .then(function (response) {
        if(response.data === false) {
          alert("Usuário já existe")
        } else {
          alert("Usuário criado");
          props.setUserId(response.data.id)
          setLoginModal(false);
          props.setLogado(true);
        }
        return;
      })
      .catch(function (e) {
        alert("Houve algo errado, por favor, tente novamente.");
        console.error(e)
      })
  };

  const onClickLogin = () => {
    const name = document.getElementById('formBasicUser');
    const password = document.getElementById('formBasicPassword');

      axios.get('https://studier-server.onrender.com/login', {
      //axios.get('http://localhost:4000/login', {
        params: {
          name: name.value,
          password: password.value
        }
      })
      .then(function (response) {
        if(response.data === '') {
          alert("Falha no login");
        } else {
          props.setUserId(response.data.id)
          setLoginModal(false)
          props.setLogado(true);
          alert("Login realizado");
        }
        return;
      })
      .catch(function (e) {
        alert("Houve algo errado, por favor, tente novamente.");
        console.error(e)
      })
  };
  const onClickSair = () => {
    props.setLogado(false);
    alert("Você foi desconectado");
    props.setUserId("");
  };
  const onShowHistory = () => {
    axios.get('https://studier-server.onrender.com/showHistory', {
    //axios.get('http://localhost:4000/showHistory', {
        params: {
          userId: props.userId
        }
      })
      .then(function (response) {
        setHistoryToShow(response)
      })
      .catch(function (e) {
        alert("Houve algo errado, por favor, tente novamente.");
        console.error(e)
      })
    setHistoryModal(true);
  }
  const onClickDeleteHistory = (id) => {
    axios.get('https://studier-server.onrender.com/deleteHistory', {
    //axios.get('http://localhost:4000/deleteHistory', {
        params: {
          id: id
        }
      })
      .then(function () {
        alert("Histórico apagado!");
        onShowHistory();
      })
      .catch(function (e) {
        alert("Houve algo errado, por favor, tente novamente.");
        console.error(e)
      })
  }

  return (
    <>
      <div className='header'>
          <div class="headerName">
            <h1>Studier</h1>
          </div>
          {
            props.logado ? <div class="headerButton">
              <Button variant="light" id='historyButton' onClick={onShowHistory}>Histórico</Button>{' '}
              <Button variant="danger" id='leaveButton' onClick={onClickSair}>Sair</Button>{' '}
            </div>
          : <div class="headerButton">
            <Button variant="light" id='loginButton' onClick={() => setLoginModal(true)}>Login</Button>{' '}
          </div>
          }
      </div>
      <Modal show={loginModal} onHide={() => setLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login / Registrar-se</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUser" >
              <Form.Label>Usuário</Form.Label>
              <Form.Control type="string" placeholder="Coloque seu usuário" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" >
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Coloque sua senha" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={onClickLogin}>Login</Button>
          <Button variant="primary" onClick={onClickCreate}>Criar conta</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={historyModal} onHide={() => setHistoryModal(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Histórico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <div className='questionHistory'>
            {
              historyToShow === '' ? <span></span> :
              <div>
                {
                  historyToShow.data.map((option, index) => {
                    return <div className='allContainerHistory'>
                  <ListGroup onClick={() => {
                      setHistoryDetailsModal(true)
                      setHistoryDetailsId(historyToShow.data[index].getQuestion.historyId)
                      }}>
                    <ListGroup.Item className='historyContainer'>
                      <span className='historyContent'>
                        Conteúdo da prova: {historyToShow.data[index].content}
                      </span>
                      <span className={historyToShow.data[index].finalGrade >= 6 ? "goodGrade" : "badGrade"}>
                        Nota final: {historyToShow.data[index].finalGrade}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button 
                    variant="danger" 
                    onClick={() => 
                    onClickDeleteHistory(historyToShow.data[index].getQuestion.historyId)} 
                    className='historyDelete'>Deletar</Button>{' '}
                  </div>
                  })
                }
              </div> 
            }
          </div>
          </div>

        </Modal.Body>
      </Modal>
      <Modal show={historyDetailsModal} onHide={() => setHistoryDetailsModal(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Histórico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='questionHistory'>
            {
              historyToShow !== ''
              ? <div>
                {
                  historyToShow.data.map((option, index) => {
                    if(option.getQuestion.historyId === historyDetailsId) {
                    return <div className='historyDetailsContainer'>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer1 === option.getUserAnswer.answer1 ? "success" : "danger"}>
                          {option.getQuestion.question1}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer1 === option.getUserAnswer.answer1 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer1}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer1 === option.getUserAnswer.answer1 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer1}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer2 === option.getUserAnswer.answer2 ? "success" : "danger"}>
                          {option.getQuestion.question2}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer2 === option.getUserAnswer.answer2 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer2}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer2 === option.getUserAnswer.answer2 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer2}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer3 === option.getUserAnswer.answer3 ? "success" : "danger"}>
                          {option.getQuestion.question3}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer3 === option.getUserAnswer.answer3 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer3}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer3 === option.getUserAnswer.answer3 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer3}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer4 === option.getUserAnswer.answer4 ? "success" : "danger"}>
                          {option.getQuestion.question4}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer4 === option.getUserAnswer.answer4 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer4}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer4 === option.getUserAnswer.answer4 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer4}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer5 === option.getUserAnswer.answer5 ? "success" : "danger"}>
                          {option.getQuestion.question5}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer5 === option.getUserAnswer.answer5 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer5}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer5 === option.getUserAnswer.answer5 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer5}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer6 === option.getUserAnswer.answer6 ? "success" : "danger"}>
                          {option.getQuestion.question6}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer6 === option.getUserAnswer.answer6 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer6}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer6 === option.getUserAnswer.answer6 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer6}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer7 === option.getUserAnswer.answer7 ? "success" : "danger"}>
                          {option.getQuestion.question7}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer7 === option.getUserAnswer.answer7 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer7}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer7 === option.getUserAnswer.answer7 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer7}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer8 === option.getUserAnswer.answer8 ? "success" : "danger"}>
                          {option.getQuestion.question8}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer8 === option.getUserAnswer.answer8 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer8}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer8 === option.getUserAnswer.answer8 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer8}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer9 === option.getUserAnswer.answer9 ? "success" : "danger"}>
                          {option.getQuestion.question9}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer9 === option.getUserAnswer.answer9 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer9}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer9 === option.getUserAnswer.answer9 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer9}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer10 === option.getUserAnswer.answer10 ? "success" : "danger"}>
                          {option.getQuestion.question10}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer10 === option.getUserAnswer.answer10 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer10}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer10 === option.getUserAnswer.answer10 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer10}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={historyToShow.data[index].finalGrade >= 6 ? "success" : "danger"}>
                          Nota final: {historyToShow.data[index].finalGrade}
                          </ListGroup.Item>
                      </ListGroup>
                  </div>
                    }
                    return '';
                  })
                }
              </div> 
              : <div></div>
            }
          </div>
        </Modal.Body>
      </Modal>
      
    </>
  );
}

export default Header;
