import 'bootstrap/dist/css/bootstrap.min.css';
import './css.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginModal from '../modals/LoginModal';
import HistoryModal from '../modals/HistoryModal';
import HistoryDetailsModal from '../modals/HistoryDetailsModal';
import ShowResultsModal from '../modals/ShowResultsModal';
import GeneratingTestModal from '../modals/GeneratingTestModal';
import FullScreenModal from '../modals/FullScreenModal';
import Header from './Header';
import StartContainer from './StartContainer';
import QuestionsContainer from './QuestionsContainer';

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
  const [loginModal, setLoginModal] = useState(false);
  const [historyDetailsModal, setHistoryDetailsModal] = useState(false);
  const [historyDetailsId, setHistoryDetailsId] = useState('');
  const [historyToShow, setHistoryToShow] = useState('');
  const [historyModal, setHistoryModal] = useState(false);

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
  const onClickSair = () => {
    setLogado(false);
    alert("Você foi desconectado");
    setUserId("");
  };
  const onShowHistory = () => {
    //axios.get('https://studier-server.onrender.com/showHistory', {
    axios.get('http://localhost:4000/showHistory', {
        params: {
          userId: userId
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
    //axios.get('https://studier-server.onrender.com/deleteHistory', {
    axios.get('http://localhost:4000/deleteHistory', {
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
  
  useEffect(() => {
    //axios.get('https://studier-server.onrender.com/connectServer', {})
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
    {connectServer ? <>
      <LoginModal 
        loginModal={loginModal} 
        setLoginModal={setLoginModal}
        setUserId={setUserId}
        setLogado={setLogado}/>
      <HistoryModal 
        historyModal={historyModal}
        setHistoryModal={setHistoryModal}
        historyToShow={historyToShow}
        setHistoryDetailsModal={setHistoryDetailsModal}
        setHistoryDetailsId={setHistoryDetailsId}
        onClickDeleteHistory={onClickDeleteHistory}/>
      <HistoryDetailsModal 
        historyDetailsModal={historyDetailsModal}
        setHistoryDetailsModal={setHistoryDetailsModal}
        historyToShow={historyToShow}
        historyDetailsId={historyDetailsId}/>
      <ShowResultsModal 
        showResults={showResults}
        handleClose={handleClose}
        finalGrade={finalGrade}
        history={history}
        onClickNewTest={onClickNewTest}
        onClickSaveHistory={onClickSaveHistory}
        logado={logado}/>
      <GeneratingTestModal spinner={spinner}/>

      <Header 
        logado={logado}
        onShowHistory={onShowHistory}
        onClickSair={onClickSair}
        setLoginModal={setLoginModal}/>

      <StartContainer 
        callBackend={callBackend}
        spinner={spinner}/>
      
      <QuestionsContainer 
        questions={questions}
        onSubmit={onSubmit}/>
      
      </> 
      : <FullScreenModal connectServer={connectServer}/>
    }
    </>
    );
}

export default Home;
