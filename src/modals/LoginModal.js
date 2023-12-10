import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function LoginModal(props) {
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
          props.setLoginModal(false)
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
          props.setLoginModal(false);
          props.setLogado(true);
        }
        return;
      })
      .catch(function (e) {
        alert("Houve algo errado, por favor, tente novamente.");
        console.error(e)
      })
  };
  return (<>
    <Modal show={props.loginModal} onHide={() => props.setLoginModal(false)}>
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
          <Button variant="primary" onClick={() => onClickLogin()}>Login</Button>
          <Button variant="primary" onClick={() => onClickCreate()}>Criar conta</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
}

export default LoginModal;
