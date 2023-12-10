import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

function ShowResultsModal(props) {

  return (<>
    <Modal show={props.showResults} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resultados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modalFinalGrade'>{`Sua nota é: ${props.finalGrade}`}</div>
          {
            props.history ? props.history.map((eachHystory) => {
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
          <Button variant="primary" onClick={props.onClickNewTest}>
            Realizar novo teste
          </Button>
          <Button variant="primary" onClick={props.onClickSaveHistory} disabled={!props.logado}>
            Salvar no histórico
          </Button>
          { props.logado ? <></> :
            <Alert variant="warning" className='warningLogin'>
            <p>
              Faça login para salvar essa prova no seu histórico.
            </p>
          </Alert>
          }
        </Modal.Footer>
      </Modal>
      </>
    );
}

export default ShowResultsModal;
