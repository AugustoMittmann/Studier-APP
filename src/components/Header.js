import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap'
import './css.css';
import { useState } from 'react';
import axios from 'axios';

function Header() {
  const[loginModal, setLoginModal] = useState(false);
  const[logado, setLogado] = useState(false);
  const[idUser, setIdUser] = useState("");

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
        console.log(response)
        if(response.data === false) {
          alert("Usuário já existe")
        } else {
          alert("Usuário criado");
          setIdUser(response.data.id);
          setLoginModal(false);
          setLogado(true);
        }
        return;
      })
      .catch(function (e) {
        console.log(e)
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
          alert("Login realizado");
          setIdUser(response.data.id);
          setLoginModal(false)
          setLogado(true);
        }
        return;
      })
      .catch(function (e) {
        console.log(e)
      })
  };

  return (
    <>
      <div className='header'>
          <div class="headerName">
            <h1>Studier</h1>
          </div>
          {
            logado ? <div class="headerButton">
              <Button variant="light" id='historyButton' onClick={() => {}}>Histórico</Button>{' '}
              <Button variant="danger" id='leaveButton' onClick={() => {
                setLogado(false)
                alert("Você foi desconectado") }}>Sair</Button>{' '}
            </div>
          : <div class="headerButton">
            <Button variant="light" id='loginButton' onClick={() => setLoginModal(true)}>Login</Button>{' '}
          </div>
          }
      </div>
      { loginModal ? 
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
      : <></>
      }
    </>
  );
}

export default Header;
