const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {  // this is based on code in 11-Express activity 26 Heroku
  // find all categories
  try {
    const categories = await Category.findAll({
      // be sure to include its associated Products
      include: Product,  // this line may be incorrect
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: Product,
    });
    if (!category) {  
      res.status(404).json({ message: 'Category ID not found.' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
