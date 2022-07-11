const router = require("express-promise-router")();
const productController = require("../controllers/card.controller");

router.post("/card", productController.createCard);
router.get("/card", productController.listAllCards);
router.delete("/card/:id", productController.deleteCardById);

module.exports = router;
