const express = require("express");
const router = express.Router();

const {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
} = require("./../controllers/admin");

const fileUpload = require("../middlewares/fileUpload");
const { verifySuperAdmin } = require("./../middlewares/verifyToken");
const { wish, unwish, getWishlist } = require("./../controllers/wishlist");

const {
  addOrder,
  deleteOrder,
  getOrdersByUserId,
} = require("./../controllers/order");

// CREATE ADMIN
router.post("/", verifySuperAdmin, fileUpload.single("image"), createAdmin);

//UPDATE ADMIN
router.put("/:id", fileUpload.single("image"), updateAdmin);

//DELETE ADMIN
router.delete("/:id", verifySuperAdmin, deleteAdmin);

//GET ADMIN
router.get("/:id", getAdmin);

//GET ALL ADMINS
router.get("/", verifySuperAdmin, getAdmins);

// GET ORDERS BY USER ID
router.get("/my-orders/:uid", getOrdersByUserId);

// VALIDATOR FOR ADD ORDER
const validator = require("./../validators/order");

// ADD ORDER
router.post("/order", validator.orderValidator(), validator.validate, addOrder);

// DELETE ORDER
router.delete("/orders/:oid", deleteOrder);

// ADD product to wishlist
router.post("/wish/:productId", wish);

// DELETE a product from wishlist
router.delete("/wish/:productId", unwish);

// GET wishlist
router.get("/wishlist", getWishlist);

module.exports = router;
