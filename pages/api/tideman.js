import { find_winner } from '../../pkg/tideman_lib'

export default (req, res) => {
  if (req.body) {
    res.statusCode = 200
    res.send(find_winner(JSON.stringify(req.body)))
  } else {
    res.statusCode = 400
    res.send(JSON.stringify({'error': 'no body'}))
  }
}
