export default {
  get404(req, res) {
    res.status(404).json({
      status: 404,
      error: 'Page Not Found',
    });
  }
};
