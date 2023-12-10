import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

function GeneratingTestModal(props) {

  return (<>
    <Modal show={props.spinner}>
        <Modal.Header>
          <Modal.Title>Gerando prova, aguarde...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          props.spinner ? 
          <div className='spinner'>
            <Spinner animation="border" role="status" variant='dark'>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className='spinnerLabel'>Pode levar cerca de 30 segundos</div>
          </div> : <></>
        }
        </Modal.Body>
      </Modal>
      </>
    );
}

export default GeneratingTestModal;
