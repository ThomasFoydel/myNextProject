function handler(req, res) {
  const { postId } = req.query;

  res.send({ _id: postId, title: 'example title', content: 'example content' });
}
export default handler;
