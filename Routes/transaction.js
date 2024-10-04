const express = require(`express`);
const transactionController = require(`../Controllers/transaction`);
const router = express.Router();

router.get("/allTransaction", transactionController.allTransaction);
router.post("/issued", transactionController.issueUpdate);
router.put("/returned", transactionController.returnUpdate);
router.get("/bookTransaction", transactionController.bookTransaction);
router.get("/bookRevenue", transactionController.bookRevenue);
router.get("/bookIssuedToUser", transactionController.userBooks);
router.get("/dateRangeFilter", transactionController.dateRangeFilter);


module.exports = router;