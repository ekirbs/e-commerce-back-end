const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET ALL CATEGORIES
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll(
      {
        include: [{ model: Product }]
      }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// GET CATEGORY BY ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    };
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// CREATE NEW CATEGORY
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  };
});

// UPDATE CATEGORY BY ID
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: "No category with this id!"});
    };
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  };
});

// DELETE CATEGORY BY ID
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category with this id!"});
      return;
    };
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
