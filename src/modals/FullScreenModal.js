import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

function FullScreenModal(props) {

  return (<>
    <Modal fullscreen={true} show={!props.connectServer}>
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
      </>
    );
}

export default FullScreenModal;
