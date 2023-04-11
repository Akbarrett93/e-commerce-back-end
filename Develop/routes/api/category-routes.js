const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      attributes: ["id", "category_name"],
      include: {
        model: Product,
        attributes: ["id", "product_name", "stock", "category_id"],
      },
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const idData = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ["id", "product_name", "stock", "category_id"],
      },
    });
    res.status(200).json(idData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const create = await Category.create(req.body);
    res.status(200).json(create);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const update = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(update);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const del = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(del);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
