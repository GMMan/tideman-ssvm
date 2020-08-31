import React from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'
import { FaVoteYea } from 'react-icons/fa'

import Header from '../components/Header'
import StartModal from '../components/StartModal'
import VotingCard from '../components/VotingCard'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstRun: true,
      showNewElectionModal: true,
      candidates: [],
      ballots: [],
      pollClosed: false
    }
  }

  onSubmitNewElection = candidateNames => {
    const newCandidates = candidateNames.map(v => {
      return {
        name: v,

      }
    })
    this.setState({
      candidates: newCandidates,
      firstRun: false,
      showNewElectionModal: false,
      ballots: [],
      pollClosed: false
    })
  }

  onCancelNewElection = () => {
    this.setState({showNewElectionModal: false})
  }

  onNewElectionButtonClick = () => {
    this.setState({showNewElectionModal: true})
  }

  onVote = (i) => (order) => {
    const newBallots = [...this.state.ballots]
    newBallots[i] = {
      committed: true,
      order
    }
    this.setState({ballots: newBallots})
  }

  onAddBallot = () => {
    const newBallots = [...this.state.ballots]
    newBallots.push({
      committed: false,
      order: []
    })
    this.setState({ballots: newBallots})
  }

  onClosePoll = () => {
    this.setState({pollClosed: true})
  }

  render() {
    const canClosePoll = this.state.ballots.length !== 0 &&
      !this.state.ballots.some(b => !b.committed)

    return (
      <>
        <Header onNewElectionClick={this.onNewElectionButtonClick}/>
        <main>
          <Container>
            <Row className='mt-3' xs={2} sm={3}>
              {this.state.ballots.map((v, i) => {
                return <VotingCard
                  key={i}
                  candidates={this.state.candidates}
                  onVote={this.onVote(i)}
                />
              })}
              {!this.state.pollClosed &&
                <VotingCard isEmpty onAddBallot={this.onAddBallot} />
              }
            </Row>
            <Row className='mb-3'>
              <Button block onClick={this.onClosePoll} disabled={!canClosePoll}>
                <FaVoteYea/> Close poll and show winner
              </Button>
            </Row>
            {!canClosePoll &&
              <Row className='mb-3'>
                <Col>
                  <div className='text-center'>To close poll, cast all ballots.</div>
                </Col>
              </Row>
            }
          </Container>
          <StartModal
            show={this.state.showNewElectionModal}
            canCancel={!this.state.firstRun}
            onSubmit={this.onSubmitNewElection}
            onCancel={this.onCancelNewElection}
          />
        </main>
      </>
    )
  }
}
