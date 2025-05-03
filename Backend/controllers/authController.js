exports.googleCallback = (req, res) => {
  //redirect to your frontend homepage
  res.redirect('http://localhost:5173'); 
};

exports.logoutUser = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};

exports.getCurrentUser = (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

