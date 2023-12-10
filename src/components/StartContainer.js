import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from 'react-bootstrap'

function StartContainer(props) {

  return (<>
    <Container className='containerQuestion'>
        <div className='subTitle'>
          <h3>Entre um tema que deseja estudar!</h3>
        </div>
        <Form.Control 
          type="textarea" 
          placeholder="Exemplo: matemática, história do Brasil, física quântica" 
          id="inputQuestion"
          className='inputText' />
        <Button 
          variant="light" 
          onClick={props.callBackend} 
          disabled={props.spinner ? true : false} >Fazer prova</Button>{' '}
      </Container>
    </>
  );
}

export default StartContainer;
