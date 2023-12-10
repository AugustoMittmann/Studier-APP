import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Badge, ListGroup } from 'react-bootstrap'

function QuestionsContainer(props) {

  return (<>
    <Container>
        {
          props.questions ? props.questions.map((question, index) => {
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
          props.questions ? <Container className='sendResult'>
          <Button variant="light" className={"submitButton"} onClick={() => props.onSubmit()}>Entregar prova e calcular resultado</Button>{' '}
          </Container> : <></>
        }
      </Container>
    </>
  );
}

export default QuestionsContainer;
