import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

function HistoryDetailsModal(props) {

  return (<>
      <Modal show={props.historyDetailsModal} onHide={() => props.setHistoryDetailsModal(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Histórico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='questionHistory'>
            {
              props.historyToShow !== ''
              ? <div>
                {
                  props.historyToShow.data.map((option, index) => {
                    if(option.getQuestion.historyId === props.historyDetailsId) {
                    return <div className='historyDetailsContainer'>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer1 === option.getUserAnswer.answer1 ? "success" : "danger"}>
                          {option.getQuestion.question1}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer1 === option.getUserAnswer.answer1 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer1}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer1 === option.getUserAnswer.answer1 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer1}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer2 === option.getUserAnswer.answer2 ? "success" : "danger"}>
                          {option.getQuestion.question2}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer2 === option.getUserAnswer.answer2 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer2}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer2 === option.getUserAnswer.answer2 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer2}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer3 === option.getUserAnswer.answer3 ? "success" : "danger"}>
                          {option.getQuestion.question3}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer3 === option.getUserAnswer.answer3 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer3}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer3 === option.getUserAnswer.answer3 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer3}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer4 === option.getUserAnswer.answer4 ? "success" : "danger"}>
                          {option.getQuestion.question4}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer4 === option.getUserAnswer.answer4 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer4}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer4 === option.getUserAnswer.answer4 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer4}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer5 === option.getUserAnswer.answer5 ? "success" : "danger"}>
                          {option.getQuestion.question5}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer5 === option.getUserAnswer.answer5 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer5}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer5 === option.getUserAnswer.answer5 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer5}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer6 === option.getUserAnswer.answer6 ? "success" : "danger"}>
                          {option.getQuestion.question6}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer6 === option.getUserAnswer.answer6 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer6}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer6 === option.getUserAnswer.answer6 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer6}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer7 === option.getUserAnswer.answer7 ? "success" : "danger"}>
                          {option.getQuestion.question7}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer7 === option.getUserAnswer.answer7 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer7}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer7 === option.getUserAnswer.answer7 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer7}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer8 === option.getUserAnswer.answer8 ? "success" : "danger"}>
                          {option.getQuestion.question8}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer8 === option.getUserAnswer.answer8 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer8}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer8 === option.getUserAnswer.answer8 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer8}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer9 === option.getUserAnswer.answer9 ? "success" : "danger"}>
                          {option.getQuestion.question9}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer9 === option.getUserAnswer.answer9 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer9}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer9 === option.getUserAnswer.answer9 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer9}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={option.getRightAnswer.answer10 === option.getUserAnswer.answer10 ? "success" : "danger"}>
                          {option.getQuestion.question10}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer10 === option.getUserAnswer.answer10 ? "success" : "danger"}>
                          Resposta certa: {option.getRightAnswer.answer10}
                        </ListGroup.Item>
                        <ListGroup.Item variant={option.getRightAnswer.answer10 === option.getUserAnswer.answer10 ? "success" : "danger"}>
                          Sua resposta: {option.getUserAnswer.answer10}
                        </ListGroup.Item>
                      </ListGroup>
                      <ListGroup className="datailedItems">
                        <ListGroup.Item variant={props.historyToShow.data[index].finalGrade >= 6 ? "success" : "danger"}>
                          Nota final: {props.historyToShow.data[index].finalGrade}
                          </ListGroup.Item>
                      </ListGroup>
                  </div>
                    }
                    return '';
                  })
                }
              </div> 
              : <div></div>
            }
          </div>
        </Modal.Body>
      </Modal>
      </>
    );
}

export default HistoryDetailsModal;
