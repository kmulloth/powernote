const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { User, Note, Notebook } = require('../../db/models');


router.get('/all', asyncHandler(async (req, res) => {
    const notes = await Note.findAll({
        include: [User, Notebook]
    });
    res.json(notes);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const note = await Note.findByPk(req.params.id, {
        include: [User, Notebook]
    });
    return res.json(note);
}));

router.post('/new', requireAuth, asyncHandler(async (req, res) => {
   const { author_id, notebook_id, title, body  } = req.body;
    const note = await Note.create({
        author_id,
        notebook_id,
        title,
        body
    });

    await note.save()
    return res.json(note);
}))

router.put('/:id', requireAuth, asyncHandler(async (req, res) => {
    const { title, body } = req.body;
    const note = await Note.findByPk({
        where : {id: req.params.id},
        include: [User, Notebook]
    });
    note.title = title;
    note.body = body;

    await note.save();
    return res.json(note);
}))

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const note = await Note.findByPk(req.params.id);
    await note.destroy();
    return res.json(note);
}))

module.exports = router;
