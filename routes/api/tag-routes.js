const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET ALL TAG
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(
      {
        include: [{ model: Product }]
      }
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// GET TAG BY ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!tagData) {
      res.status(404).json({ message: "No tag with this id!" });
      return;
    };
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// CREATE NEW TAG
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  };
});

// UPDATE TAG BY ID
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "No tag with this id!"});
    };
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  };
});

// DELETE TAG BY ID
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag with this id!"});
      return;
    };
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
