import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'

function Header(props) {

  return (<>
    <div className='header'>
          <div class="headerName">
            <h1>Studier</h1>
          </div>
          {
            props.logado ? <div class="headerButton">
              <Button variant="light" id='historyButton' onClick={props.onShowHistory}>Histórico</Button>{' '}
              <Button variant="danger" id='leaveButton' onClick={props.onClickSair}>Sair</Button>{' '}
            </div>
          : <div class="headerButton">
            <Button variant="light" id='loginButton' onClick={() => props.setLoginModal(true)}>Login</Button>{' '}
          </div>
          }
      </div>
    </>
  );
}

export default Header;
