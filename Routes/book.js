const express = require(`express`);
const bookController = require(`../Controllers/book`);
const router = express.Router();

router.get("/allBook", bookController.allBook);
router.get("/book", bookController.bookSearch);
router.get("/price", bookController.rentFilter);
router.get("/fullBookSearch", bookController.fullBookSearch);


module.exports = router;