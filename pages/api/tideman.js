import { find_winner } from '../../pkg/tideman_lib'

export default (req, res) => {
  res.statusCode = 200
  res.send(find_winner(JSON.stringify(req.body)))
}
