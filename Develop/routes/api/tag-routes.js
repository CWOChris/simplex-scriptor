const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      // be sure to include its associated Product data
      include: Product,
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: Product,
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag); // 200 would also work here
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const [affectedRows] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
    },
  });
    if (affectedRows > 0) {
      res.status(200).json(affectedRows, { message: 'Tag ID updated successfully!' });
    } else {
      res.status(404).json({ message: 'Tag ID not found.' });
    }} catch (err) {
      res.status(500).json(err); // probably should be a 400 here
    }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  
});

module.exports = router;
