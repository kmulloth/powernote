const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { User, Note, Notebook } = require('../../db/models');


router.get('/all', asyncHandler(async (req, res) => {
    const notebooks = await Notebook.findAll({
        include: [User, Note]
    });
    res.json(notebooks);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const note = await Notebook.findByPk(req.params.id, {
        include: [User, Note]
    });
    return res.json(note);
}));

router.post('/new', requireAuth, asyncHandler(async (req, res) => {
   const { author_id, title, color  } = req.body;
    const notebook = await Notebook.create({
        author_id,
        title,
        color
    });

    await notebook.save()
    return res.json(notebook);
}))

router.put('/:id', requireAuth, asyncHandler(async (req, res) => {
    const { title, color } = req.body;
    const note = await Notebook.findByPk({
        where : {id: req.params.id},
        include: [User, Notebook]
    });
    note.title = title;
    note.color = color;

    await note.save();
    return res.json(note);
}))

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const notebook = await Notebook.findByPk(req.params.id);
    await notebook.destroy();
    return res.json(notebook);
}))

module.exports = router;
