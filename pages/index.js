import styles from '../styles/Home.module.css'
import React from 'react'
import Header from '../components/Header'
import { Container } from 'react-bootstrap'
import StartModal from '../components/StartModal'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstRun: true,
      showNewElectionModal: true,
      candidates: []
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
      showNewElectionModal: false
    })
  }

  onCancelNewElection = () => {
    this.setState({showNewElectionModal: false})
  }

  onNewElectionButtonClick = () => {
    this.setState({showNewElectionModal: true})
  }

  render() {
    return (
      <Container>
        <Header onNewElectionClick={this.onNewElectionButtonClick}/>
        
        <main className={styles.main}>

        </main>

        <StartModal
          show={this.state.showNewElectionModal}
          canCancel={!this.state.firstRun}
          onSubmit={this.onSubmitNewElection}
          onCancel={this.onCancelNewElection}
        />
      </Container>
    )
  }
}
