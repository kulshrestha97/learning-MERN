const express = require("express"); // import everywhere you use.

const router = express.Router(); // this is provided by express to make seperate routers.

const placesController = require("../controllers/places-controllers");

// like GET there are all the flavours present such as POST, PUT, DELETE etc.
router.get("/:pid", placesController.getPlaceById); // here we are pointing to the function from controller that we want express to run for us.

router.get("/users/:uid", placesController.getPlaceByUserId); // good amount of decoupling.

router.post("/", placesController.createPlace);

router.patch("/:pid", placesController.updatePlaceByPlaceId );
module.exports = router; // just like in react we export the component in order to use it. This is node js syntax
