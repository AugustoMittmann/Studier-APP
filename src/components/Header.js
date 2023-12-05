import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap'
import './css.css';
import { useState } from 'react';
//import mysql from 'mysql2';

function Header() {
  const[loginModal, setLoginModal] = useState();

  const handleSubmit = () => {
    const usuario = document.getElementById('formBasicUser');
    const senha = document.getElementById('formBasicPassword');
    console.log(usuario.value);
    console.log(senha.value)
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
