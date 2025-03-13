const express = require("express");
const router = express.Router();
// ! destructurin
const {
  index,
  show,
  store,
  update,
  modify,
  destroy,
} = require("../controller/postController");

// middleWare importato
const checkTime = require("../middlewares/checkTime");


// ! middleware per tute le rotte
router.use(checkTime);


// index GET
router.get("/", index);

// show GET

router.get("/:id", show);

// router.get(`/:slug`, (req, res));

// store POST
router.post("/", store);

// update PUT

router.put("/:id", update);

// modify PATCH

router.patch("/:id", modify);

// destroy DELATE

router.delete("/:id", destroy);

module.exports = router;
