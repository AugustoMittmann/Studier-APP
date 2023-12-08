import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap'
import './css.css';
import { useEffect, useState } from 'react';
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

      //axios.get('https://studier-server.onrender.com/create', {
      axios.get('http://localhost:4000/create', {
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
              historyToShow === '' ? <span>Nenhuma prova encontrada. Faça mais provas e salve no histórico para aparecer aqui.</span> :
              <div>
                {
                  historyToShow.data.map((option, index) => {
                    return <div className='allContainerHistory'>
                    <div className='historyContainer' onClick={() => {
                      setHistoryDetailsModal(true)
                      setHistoryDetailsId(historyToShow.data[index].getQuestion.historyId)
                      }}>
                        <span className='historyContent'>
                          Conteúdo da prova: {historyToShow.data[index].content}
                        </span>
                        <span className='historyGrade'>
                          Nota final: {historyToShow.data[index].finalGrade}
                        </span>
                  </div>
                  <div className='historyDelete'>
                    <span onClick={() => onClickDeleteHistory(historyToShow.data[index].getQuestion.historyId)}>
                      Deletar
                    </span>
                  </div>
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
                      console.log(option)
                    return <div className='historyDetailsContainer'>
                      <div className='historyQuestion1'>
                        <div>{option.getQuestion.question1}</div>
                        <div>Resposta certa: {option.getRightAnswer.answer1}</div>
                        <div>Sua resposta: {option.getUserAnswer.answer1}</div>
                      </div>
                      <div className='historyQuestion2'>
                        <div>{option.getQuestion.question2}</div>
                        <div>Resposta certa: {option.getRightAnswer.answer2}</div>
                        <div>Sua resposta: {option.getUserAnswer.answer2}</div>
                      </div>
                      <div className='historyQuestion3'>
                        <div>{option.getQuestion.question3}</div>
                        <div>Resposta certa: {option.getRightAnswer.answer3}</div>
                        <div>Sua resposta: {option.getUserAnswer.answer3}</div>
                      </div>
                      <div className='historyQuestion4'>
                        <div>{option.getQuestion.question4}</div>
                        <div>Resposta certa: {option.getRightAnswer.answer4}</div>
                        <div>Sua resposta: {option.getUserAnswer.answer4}</div>
                      </div>
                      <div className='historyQuestion5'>
                        <div>{option.getQuestion.question5}</div>
                        <div>Resposta certa: {option.getRightAnswer.answer5}</div>
                        <div>Sua resposta: {option.getUserAnswer.answer5}</div>
                      </div>
                      <div className='historyQuestion6'>
                        <div>{option.getQuestion.question6}</div>
                        <div>Resposta certa: {option.getRightAnswer.answer6}</div>
                        <div>Sua resposta: {option.getUserAnswer.answer6}</div>
                      </div>
                      <div className='historyQuestion7'>
                        <div>{option.getQuestion.question7}</div>
                        <div>Resposta certa: {option.getRightAnswer.answer7}</div>
                        <div>Sua resposta: {option.getUserAnswer.answer7}</div>
                      </div>
                      <div className='historyQuestion8'>
                        <div>{option.getQuestion.question8}</div>
                        <div>Resposta certa: {option.getRightAnswer.answer8}</div>
                        <div>Sua resposta: {option.getUserAnswer.answer8}</div>
                      </div>
                      <div className='historyQuestion9'>
                        <div>{option.getQuestion.question9}</div>
                        <div>Resposta certa: {option.getRightAnswer.answer9}</div>
                        <div>Sua resposta: {option.getUserAnswer.answer9}</div>
                      </div>
                      <div className='historyQuestion10'>
                        <div>{option.getQuestion.question10}</div>
                        <div>Resposta certa: {option.getRightAnswer.answer10}</div>
                        <div>Sua resposta: {option.getUserAnswer.answer10}</div>
                      </div>
                      <div>Nota final: {historyToShow.data[index].finalGrade}</div>
                  </div>
                    }
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
