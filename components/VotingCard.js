import React from 'react'
import { Card, ListGroup, Button, ButtonGroup, Col } from 'react-bootstrap'
import { FaChevronCircleUp, FaChevronCircleDown, FaVoteYea, FaPlusCircle } from 'react-icons/fa'
import _ from 'lodash'

function VotingItem(props) {
  const { name, committed, canMoveUp, canMoveDown, onUpClick, onDownClick } = props

  return (
    <ListGroup.Item>
      {!committed &&
        <ButtonGroup>
          <Button variant='secondary' label='Move up'
            disabled={!canMoveUp} onClick={onUpClick}
          >
            <FaChevronCircleUp/>
          </Button>
          <Button variant='secondary' label='Move down'
            disabled={!canMoveDown} onClick={onDownClick}
          >
            <FaChevronCircleDown/>
          </Button>
        </ButtonGroup>
      }
      &nbsp;&nbsp;{name}
    </ListGroup.Item>
  )
}

export default class VotingCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      candidateOrder: props.isEmpty ? [] : _.range(props.candidates.length),
      committed: false,
    }
  }

  onMoveDown = orderIndex => () => {
    const newCandidateOrder = [...this.state.candidateOrder]
    const removed = newCandidateOrder.splice(orderIndex, 1)
    newCandidateOrder.splice(orderIndex + 1, 0, ...removed)
    this.setState({candidateOrder: newCandidateOrder})
  }

  onMoveUp = orderIndex => () => {
    const newCandidateOrder = [...this.state.candidateOrder]
    const removed = newCandidateOrder.splice(orderIndex, 1)
    newCandidateOrder.splice(orderIndex - 1, 0, ...removed)
    this.setState({candidateOrder: newCandidateOrder})
  }

  onVoteClicked = () => {
    this.setState({committed: true})
    this.props.onVote(this.state.candidateOrder)
  }

  onAddBallotClicked = () => {
    this.props.onAddBallot()
  }

  render() {
    const { isEmpty, candidates } = this.props
    const numCandidates = candidates && candidates.length

    return (
      <Col className='mb-4'>
        <Card className='h-100'>
          <Card.Header>
            Ballot
          </Card.Header>
          {!isEmpty &&                 
            <ListGroup variant='flush'>
              {this.state.candidateOrder.map((v, i) => {
                return <VotingItem
                  key={v}
                  name={candidates[v].name}
                  committed={this.state.committed}
                  canMoveUp={i > 0}
                  canMoveDown={i < numCandidates - 1}
                  onUpClick={this.onMoveUp(i)}
                  onDownClick={this.onMoveDown(i)}
                />
              })}
            </ListGroup>
          }
          <Card.Body>
            {isEmpty ? (
              <Button block onClick={this.onAddBallotClicked}>
                <FaPlusCircle/> Add ballot
              </Button>
            ) : (
              <Button block disabled={this.state.committed}
                onClick={this.onVoteClicked}
              >
                <FaVoteYea/> Vote{this.state.committed && ' cast'}
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
    )
  }
}
