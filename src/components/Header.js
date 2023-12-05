import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap'
import './css.css';
import { useState } from 'react';
import axios from 'axios';

function Header() {
  const[loginModal, setLoginModal] = useState();

  const handleSubmit = () => {
    const name = document.getElementById('formBasicUser');
    const password = document.getElementById('formBasicPassword');

    axios.get('https://studier-server.onrender.com/create', {
      //axios.get('http://localhost:4000/create', {
        params: {
          name: name.value,
          password: password.value
        }
      })
      .then(function (response) {
        setLoginModal(false)
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
          <div class="headerButton">
            <Button variant="light" onClick={() => setLoginModal(true)}>Login</Button>{' '}
          </div>
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
          <Button variant="primary" onClick={handleSubmit}>Login</Button>
          <Button variant="primary">Criar conta</Button>
        </Modal.Footer>
      </Modal>
      : <></>
      }
    </>
  );
}

export default Header;
