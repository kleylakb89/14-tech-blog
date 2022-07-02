// authorization based on login status function - written using class modules as reference
const withAuth = (req,res,next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = withAuth;