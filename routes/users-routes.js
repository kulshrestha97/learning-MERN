const express = require("express"); // import everywhere you use.

const router = express.Router(); // this is provided by express to make seperate routers.

const usersController = require("../controllers/users-controllers");

// like GET there are all the flavours present such as POST, PUT, DELETE etc.
router.get("/", usersController.getUsers); // here we are pointing to the function from controller that we want express to run for us.
router.post("/signup", usersController.signup); // good amount of decoupling.
router.get("/login", usersController.login);

module.exports = router; // just like in react we export the component in order to use it. This is node js syntax
