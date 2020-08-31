import { find_winner } from '../../pkg/tideman_lib'

export default (req, res) => {
  if (req.method === 'GET') {
    res.statusCode = 405
    res.end()
    return
  }

  if (req.body) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.send(find_winner(JSON.stringify(req.body)))
  } else {
    res.statusCode = 400
    res.json({'error': 'no body'})
  }
}
