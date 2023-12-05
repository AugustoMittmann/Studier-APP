import 'bootstrap/dist/css/bootstrap.min.css';
import './css.css';
import { Container, Badge, Button, Form, ListGroup, Spinner } from 'react-bootstrap'
import { useState } from 'react';
import Header from './Header'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Home() {

  const [showResults, setShowResult] = useState(false);
  const [questions, setQuestions] = useState('');
  const [finalGrade, setFinalGrade] = useState(0);
  const [spinner, setSpinner] = useState(false);

  const handleClose = () => setShowResult(false);

  const onSubmit = () => {
    setShowResult(true);
    setFinalGrade(0);
    let rightAnswers = 0;
    questions.forEach((question, index) => {
      const question1 = document.getElementsByName(`group${index}`);
      for (let i=0; i<question1.length; i++) if (question1[i].checked) if(question1[i].id === question.rightAnswer) {
        rightAnswers++;
      }
    })
    setFinalGrade(rightAnswers)
  }

  const onShowResultsDetails = () => {}

  const callBackend = () => {
    setSpinner(true);
    const inputQuestion = document.getElementById('inputQuestion');
    axios.get('http://localhost:4000/test', {
      params: {
        content: inputQuestion.value
      }
    })
    .then(function (response) {
      console.log(response.data)
      setQuestions(response.data);
      setSpinner(false)
      return;
    })
    .catch(function (e) {
      console.log(e)
    })

    setSpinner(true);
    
  }


  return (
    <>
      <Header />
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
          onClick={callBackend} 
          disabled={spinner ? true : false} >Fazer prova</Button>{' '}
      </Container>
      <Container>
        {
          questions ? questions.map((question, index) => {
            return <Container className='completeQuestion' key={index}>
              <Container>
                <Badge className='question' bg="light"><h5>{question.question}</h5></Badge>
              </Container>
              <Container className='questionOptions'>
                <ListGroup>
                  <Form>
                    <ListGroup.Item className='options'>
                      <Form.Check
                        type={'radio'}
                        id={`A`}
                        name={`group${index}`}
                        label={`A) ${question.answers.A}`}
                        title={`${index+1}A`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className='options'>
                      <Form.Check
                        type={'radio'}
                        id={`B`}
                        name={`group${index}`}
                        label={`B) ${question.answers.B}`}
                        title={`${index+1}B`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className='options'>
                      <Form.Check
                        type={'radio'}
                        id={`C`}
                        name={`group${index}`}
                        label={`C) ${question.answers.C}`}
                        title={`${index+1}C`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className='options'>
                      <Form.Check
                        type={'radio'}
                        id={`D`}
                        name={`group${index}`}
                        label={`D) ${question.answers.D}`}
                        title={`${index+1}D`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className={`options `}>
                      <Form.Check
                        type={'radio'}
                        id={`E`}
                        name={`group${index}`}
                        label={`E) ${question.answers.E}`}
                        title={`${index+1}E`}
                      />
                    </ListGroup.Item>
                  </Form>
                </ListGroup>
              </Container>
            </Container>
          }) : <></>
        }
        {
          questions ? <Container className='sendResult'>
          <Button variant="light" onClick={() => onSubmit()}>Entregar prova e calcular resultado</Button>{' '}
          </Container> : <></>
        }
      </Container>
      <Modal show={showResults} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Resultados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Sua nota é: ${finalGrade}`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Realizar novo teste
          </Button>
          <Button variant="primary" onClick={onShowResultsDetails}>
            Ver detalhes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={spinner}>
        <Modal.Header closeButton>
          <Modal.Title>Gerando prova, aguarde</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
        spinner ? 
        <div className='spinner'>
          <Spinner animation="border" role="status" variant='light'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <div className='spinnerLabel'>Gerando prova, aguarde...</div>
        </div> : <></>
      }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Home;
