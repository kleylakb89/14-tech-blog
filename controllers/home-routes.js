const router = require('express').Router();
const {Blog, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            attributes: ['id', 'title', 'text', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blogs = blogData.map((blog) => blog.get({plain: true}));

        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            attributes: ['title', 'text', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blog = blogData.get({plain: true});

        res.render('blog', {blog, loggedIn: req.session.loggedIn});
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        return res.redirect('/');
    }

    res.render('login');
})

module.exports = router;