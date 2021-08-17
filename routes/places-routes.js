const express = require('express'); // import everywhere you use.

const router = express.Router(); // this is provided by express to make seperate routers.

const HttpError = require('../models/http-error');
const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers',
        location: {
            lat: 39,
            lng: 45
        },
        address: '295 W 35th Street, New York NY 10001',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers',
        location: {
            lat: 39,
            lng: 45
        },
        address: '295 W 35th Street, New York NY 10002',
        creator: 'u2'
    }
];

// like GET there are all the flavours present such as POST, PUT, DELETE etc.
router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid;
    const returnValue = DUMMY_PLACES.find(place => place.id === placeId);
    console.log("GET request in places");
    if(!returnValue)
    {
        const error = new HttpError("Cannot find the place id", 404);
        

        return next(error);
    } 
    res.json(returnValue);

    
    

});

router.get('/users/:uid', (req, res, next) => {
const userId = req.params.uid;
const userDetails = DUMMY_PLACES.find(place => place.creator === userId);
res.json({userDetails}); // same as: {userDetails: userDetails}
});



module.exports = router; // just like in react we export the component in order to use it. This is node js syntax