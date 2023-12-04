import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import './css.css';

function Header() {

  return (
    <>
      <Container fluid className='header'>
        <h1>Studier</h1>
      </Container>
    </>
  );
}

export default Header;
