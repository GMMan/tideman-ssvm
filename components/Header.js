import { Navbar, Button } from "react-bootstrap";
import Link from 'next/link'

export default function Header(props) {
	const { onNewElectionClick } = props

	return (
		<Navbar bg='light'>
      <Link href='/' passHref>
        <Navbar.Brand>Tideman</Navbar.Brand>
      </Link>
			<Button onClick={onNewElectionClick}>New election</Button>
		</Navbar>
	)
}
