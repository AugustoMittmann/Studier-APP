import 'bootstrap/dist/css/bootstrap.min.css';
import './css.css';
import { Container, Badge, Button, Form, ListGroup, Spinner, Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import Header from './Header'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Home() {

  const [showResults, setShowResult] = useState(false);
  const [questions, setQuestions] = useState('');
  const [finalGrade, setFinalGrade] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [history, setHistory] = useState();
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState('');
  const [logado, setLogado] = useState(false);
  const [connectServer, setConnectServer] = useState(false);

  const onClickNewTest = () => {
    setShowResult(false);
    setQuestions('');
    const inputQuestion = document.getElementById('inputQuestion');
    inputQuestion.value = "";
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const handleClose = () => setShowResult(false);

  const discoverLetter = (question, letter) => {
    let rightLetter;
    if(question.answers.A === letter) rightLetter = "A";
    if(question.answers.B === letter) rightLetter = "B";
    if(question.answers.C === letter) rightLetter = "C";
    if(question.answers.D === letter) rightLetter = "D";
    if(question.answers.E === letter) rightLetter = "E";
    return rightLetter;
  } 
  const onSubmit = () => {
    setShowResult(true);
    setFinalGrade(0);
    let currentHistory = []
    let rightAnswers = 0;
    questions.forEach((question, index) => {
      const question1 = document.getElementsByName(`group${index}`);
      let userAnswer
      for (let i=0; i<question1.length; i++) if (question1[i].checked) {
        if(question1[i].id[0] === question.rightAnswer) {
          rightAnswers++;
        }
        if(question.answers.A === question.answers[question1[i].id[0]]) userAnswer = discoverLetter(question, question.answers.A) + `)` + question.answers.A
        if(question.answers.B === question.answers[question1[i].id[0]]) userAnswer = discoverLetter(question, question.answers.B) + `)` + question.answers.B
        if(question.answers.C === question.answers[question1[i].id[0]]) userAnswer = discoverLetter(question, question.answers.C) + `)` + question.answers.C
        if(question.answers.D === question.answers[question1[i].id[0]]) userAnswer = discoverLetter(question, question.answers.D) + `)` + question.answers.D
        if(question.answers.E === question.answers[question1[i].id[0]]) userAnswer = discoverLetter(question, question.answers.E) + `)` + question.answers.E
    }
    
    currentHistory.push({
      question: question.question,
      rightAnswer: questions[index].rightAnswer + `)` + question.answers[question.rightAnswer],
      userAnswer: userAnswer
      })
    })
    setFinalGrade(rightAnswers);
    setHistory(currentHistory);
  }
  const onClickSaveHistory = () => {
    alert("Prova salva!");
    //axios.get('https://studier-server.onrender.com/saveHistory', {
    axios.get('http://localhost:4000/saveHistory', {
      params:{
        userId: userId,
        history: history,
        finalGrade: finalGrade,
        content: content,
      }
    })
  }
  const callBackend = () => {
    setQuestions('');
    setSpinner(true);
    const inputQuestion = document.getElementById('inputQuestion');
    setContent(inputQuestion.value);
    //axios.get('https://studier-server.onrender.com/question', {
    axios.get('http://localhost:4000/question', {
      params: {
        content: inputQuestion.value
      }
    })
    .then(function (response) {
      setQuestions(response.data);
      setSpinner(false)
      return;
    })
    .catch(function (e) {
      alert("Houve uma falha, tente novamente")
      console.error(e)
      setSpinner(false)
    })
  }
  useEffect(() => {
		axios.get('http://localhost:4000/connectServer', {})
    .then(function () {
      setConnectServer(true);
      return;
    })
    .catch(function (e) {
      alert("Houve uma falha, tente recarregar a página")
      console.error(e)
    })
	}, [])
  return (
    <>
    {connectServer ? <><Header 
        setUserId={setUserId} 
        userId={userId} 
        logado={logado} 
        setLogado={setLogado}/>
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
                    <label for={`A${index}`} className='labelAnswer'>
                      <ListGroup.Item className='options'>
                        <Form.Check
                          type={'radio'}
                          id={`A${index}`}
                          name={`group${index}`}
                          label={`A) ${question.answers.A}`}
                          title={`${index+1}A`}
                          />
                      </ListGroup.Item>
                    </label>
                    <label for={`B${index}`} className='labelAnswer'>
                      <ListGroup.Item className='options'>
                        <Form.Check
                          type={'radio'}
                          id={`B${index}`}
                          name={`group${index}`}
                          label={`B) ${question.answers.B}`}
                          title={`${index+1}B`}
                        />
                      </ListGroup.Item>
                    </label>
                    <label for={`C${index}`} className='labelAnswer'>
                      <ListGroup.Item className='options'>
                        <Form.Check
                          type={'radio'}
                          id={`C${index}`}
                          name={`group${index}`}
                          label={`C) ${question.answers.C}`}
                          title={`${index+1}C`}
                          />
                      </ListGroup.Item>
                    </label>
                    <label for={`D${index}`} className='labelAnswer'>
                      <ListGroup.Item className='options'>
                        <Form.Check
                          type={'radio'}
                          id={`D${index}`}
                          name={`group${index}`}
                          label={`D) ${question.answers.D}`}
                          title={`${index+1}D`}
                          />
                      </ListGroup.Item>
                    </label>
                    <label for={`E${index}`} className='labelAnswer'>
                      <ListGroup.Item className={`options `}>
                        <Form.Check
                          type={'radio'}
                          id={`E${index}`}
                          name={`group${index}`}
                          label={`E) ${question.answers.E}`}
                          title={`${index+1}E`}
                          />
                      </ListGroup.Item>
                    </label>
                  </Form>
                </ListGroup>
              </Container>
            </Container>
          }) : <></>
        }
        {
          questions ? <Container className='sendResult'>
          <Button variant="light" className={"submitButton"} onClick={() => onSubmit()}>Entregar prova e calcular resultado</Button>{' '}
          </Container> : <></>
        }
      </Container>
      <Modal show={showResults} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resultados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modalFinalGrade'>{`Sua nota é: ${finalGrade}`}</div>
          {
            history ? history.map((eachHystory) => {
              return <div className='allResultQuestions'>
                <div className={`modalQuestion ` + (eachHystory.userAnswer === eachHystory.rightAnswer ? "goodGrade" : "badGrade")}>
                  {eachHystory.question}
                  {console.log()}
                  </div>
                <div className={`modalUserAnswer ` + (eachHystory.userAnswer === eachHystory.rightAnswer ? "goodGrade" : "badGrade")}>
                  Sua resposta: {eachHystory.userAnswer}
                  </div>
                <div className={`modalRightAnswer ` + (eachHystory.userAnswer === eachHystory.rightAnswer ? "goodGrade" : "badGrade")}>
                  Resposta correta: {eachHystory.rightAnswer}
                  </div>
              </div>
            }) : <></>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickNewTest}>
            Realizar novo teste
          </Button>
          <Button variant="primary" onClick={onClickSaveHistory} disabled={!logado}>
            Salvar no histórico
          </Button>
          { logado ? <></> :
            <Alert variant="warning" className='warningLogin'>
            <p>
              Faça login para salvar essa prova no seu histórico.
            </p>
          </Alert>
          }
        </Modal.Footer>
      </Modal>
      <Modal show={spinner}>
        <Modal.Header>
          <Modal.Title>Gerando prova, aguarde...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
        spinner ? 
        <div className='spinner'>
          <Spinner animation="border" role="status" variant='dark'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <div className='spinnerLabel'>Pode levar cerca de 30 segundos à 1 minuto</div>
        </div> : <></>
      }
        </Modal.Body>
      </Modal></> 
      : <Modal fullscreen={true} show={!connectServer}>
      <Modal.Body>
      {
      <div className='spinner'>
        <Spinner animation="border" role="status" variant='dark'>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <div className='spinnerLabel'>Conectando ao servidor</div>
      </div>
    }
      </Modal.Body>
    </Modal>
    }
    </>
    );
}

export default Home;
