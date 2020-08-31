import { Form, Modal, Button, Container, InputGroup } from "react-bootstrap"
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import { useState } from 'react'

function CandidateRow(props) {
  const { index, value, isValid, onValueChange, onRemove } = props

  return (
    <Form.Group controlId={`candidate${index}`}>
      <InputGroup>
        <Form.Label srOnly>Name</Form.Label>
        <Form.Control required isInvalid={!!value && !isValid} placeholder='Name' onChange={onValueChange}
          value={value} />
        <InputGroup.Append>
          <Button title='Remove' variant='secondary' onClick={onRemove}><FaMinusCircle/></Button>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  )
}

export default function StartModal(props) {
  const { show, canCancel, onSubmit, onCancel } = props

  const [candidateNames, setCandidateNames] = useState([])
  const [showValidationErrors, setShowValidationErrors] = useState(false)

  const onCandidateNameChange = (i) => (event) => {
    const newNames = [...candidateNames]
    newNames[i] = event.target.value
    setCandidateNames(newNames)
  }

  const onAddCandidate = () => {
    const newNames = [...candidateNames]
    newNames.push('')
    setCandidateNames(newNames)
  }

  const onRemoveCandidate = (i) => () => {
    const newNames = [...candidateNames]
    newNames.splice(i, 1)
    setCandidateNames(newNames)
  }

  const onConfirmClick = () => {
    if (candidateNames.some(v => v.length === 0)) {
      setShowValidationErrors(true)
    } else {
      setShowValidationErrors(false)
      onSubmit(candidateNames)
    }
  }

  const resetModal = () => {
    setCandidateNames([])
    setShowValidationErrors(false)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
  }
  
  const addRow = (
    <Form.Row>
      <Button variant='secondary' block onClick={onAddCandidate}>
        <FaPlusCircle/> Add candidate
      </Button>
    </Form.Row>
  )

  return (
    <Modal
      show={show}
      onHide={onCancel}
      onEnter={resetModal}
    >
      <Modal.Header closeButton={canCancel}>
        <Modal.Title>New election</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h4 className='text-center'>Enter the names of the candidates:</h4>
        <Form validated={showValidationErrors} onSubmit={onFormSubmit}>
          {candidateNames.map((v, i) => {
            return <CandidateRow
              key={i}
              index={i}
              value={v}
              isValid={!!candidateNames[i]}
              onValueChange={onCandidateNameChange(i)}
              onRemove={onRemoveCandidate(i)}
            />
          })}
          {addRow}
        </Form>

      </Modal.Body>

      <Modal.Footer>
        { canCancel &&
          <Button variant='secondary' onClick={onCancel}>Cancel</Button>
        }
        <Button variant='primary' disabled={candidateNames.length === 0}
          onClick={onConfirmClick}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
