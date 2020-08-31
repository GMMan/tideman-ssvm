import { Modal, Button } from "react-bootstrap"

export default function WinnerModal(props) {
  const { show, winnerName, onClose } = props

  return (
    <Modal
      show={show}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Election winner</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {winnerName === null ? (
          <h4 className='text-center'>Error getting winner</h4>
        ) : (
          <>
            <h4 className='text-center'>The winner is:</h4>
            <h2 className='text-center'>{winnerName}</h2>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  )
}
