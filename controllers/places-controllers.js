// controller will hold the middleware functions that we want to execute once the route for the API hits.
const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers",
      location: {
        lat: 39,
        lng: 45,
      },
      address: "295 W 35th Street, New York NY 10001",
      creator: "u1",
    },
    {
      id: "p2",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers",
      location: {
        lat: 39,
        lng: 45,
      },
      address: "295 W 35th Street, New York NY 10002",
      creator: "u2",
    },
  ];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const returnValue = DUMMY_PLACES.find((place) => place.id === placeId);
  console.log("GET request in places");
  if (!returnValue) {
    const error = new HttpError("Cannot find the place id", 404);

    return next(error);
  }
  res.json(returnValue);
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const userDetails = DUMMY_PLACES.find((place) => place.creator === userId);
  res.json({ userDetails }); // same as: {userDetails: userDetails}
};

const createPlace = (req, res, next) => {
  const {title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    title,
    description,
    location: coordinates,
    address,
    creator
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json(createdPlace);

}

const updatePlaceByPlaceId = (req, res, next) => {
  const {title, description} = req.body;
  const placeId = req.params.id;
  const updatedPlace = {...DUMMY_PLACES.find( place => place.id === placeId)};
  const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({place: updatedPlace});
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceByPlaceId = updatePlaceByPlaceId;