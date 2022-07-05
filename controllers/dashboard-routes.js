const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
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

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('new-post', {
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/new', withAuth, async (req, res) => {
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

router.get('/:id', withAuth, async (req, res) => {
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

    const blog = blogData.get({ plain: true });

    res.render('update-blog', { blog, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update({
      title: req.body.title,
      text: req.body.text,
      where: req.params.id,
      attributes: ['title', 'text', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('update-blog', { blog, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;