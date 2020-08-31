export default (req, res) => {
  res.statusCode = 200
  res.json({ winner: 'John Doe' })
}
