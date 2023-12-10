import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ListGroup } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

function HistoryModal(props) {

  return (<>
    <Modal show={props.historyModal} onHide={() => props.setHistoryModal(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Histórico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <div className='questionHistory'>
            {
              props.historyToShow === '' ? <span></span> :
              <div>
                {
                  props.historyToShow.data.map((option, index) => {
                    return <div className='allContainerHistory'>
                  <ListGroup onClick={() => {
                      props.setHistoryDetailsModal(true)
                      props.setHistoryDetailsId(props.historyToShow.data[index].getQuestion.historyId)
                      }}>
                    <ListGroup.Item className='historyContainer'>
                      <span className='historyContent'>
                        Conteúdo da prova: {props.historyToShow.data[index].content}
                      </span>
                      <span className={props.historyToShow.data[index].finalGrade >= 6 ? "goodGrade" : "badGrade"}>
                        Nota final: {props.historyToShow.data[index].finalGrade}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button 
                    variant="danger" 
                    onClick={() => 
                    props.onClickDeleteHistory(props.historyToShow.data[index].getQuestion.historyId)} 
                    className='historyDelete'>Deletar</Button>{' '}
                  </div>
                  })
                }
              </div> 
            }
          </div>
          </div>

        </Modal.Body>
      </Modal>
      </>
    );
}

export default HistoryModal;
