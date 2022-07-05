const router = require('express').Router();
const {Blog, User, Comment} = require('../models');
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
                {
                    model: Comment,
                    attributes: ['text', 'created_at'],
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ],
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

router.post('/blog/:id', withAuth, async (req, res) => {
    console.log(req.params.id, req.session.userId);
    try {
        const commentData = await Comment.create({
            text: req.body.text,
            user_id: req.session.userId,
            blog_id: req.params.id,
        });

        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            attributes: ['id', 'title', 'text', 'created_at'],
            where: {
                user_id: req.session.userId,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blogs = blogData.map((blog) => blog.get({plain: true}));

        res.render('dashboard', {
            blogs,
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard/new', withAuth, async (req, res) => {
    try {
        res.render('new-post', {
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/dashboard/new', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.userId,
        });

        res.status(200).json(blogData);
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