exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
	req.session.lastVisit = new Date();

	//res.send('Hello World - from MEAN');
	res.render('index', {
		title: 'Hello World from EJS',
		userFullName: req.user ? req.user.firstName : ''
	});
};
