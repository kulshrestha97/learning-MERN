// controller will hold the middleware functions that we want to execute once the route for the API hits.
const HttpError = require("../models/http-error");
const Place = require("../models/place");
const mongoose = require("mongoose");
const User = require("../models/user");
let DUMMY_PLACES = [
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
    title: "Bombay Stock Exchange",
    description: "Money India",
    location: {
      lat: 39,
      lng: 45,
    },
    address: "295 W 35th Street, New York NY 10002",
    creator: "u2",
  },
  {
    id: "p3",
    title: "National Stock Exchange",
    description: "Money India Delhi",
    location: {
      lat: 39,
      lng: 45,
    },
    address: "295 W 35th Street, New York NY 10002",
    creator: "u2",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  // Below code is not working, need to know why.
  // Place.findById(placeId)
  //   .exec()
  //   .then((res) => (place = res))
  //   .catch((error) => next(new HttpError(error, 500)));

  if (!place) {
    const error = new HttpError("Cannot find the place id", 404);

    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let place;

  try {
    place = await Place.find({ creator: userId });
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (!place) {
    return next(new HttpError("Couldn't find any place with the user id", 404));
  }
  res.json({ place }); // same as: {userDetails: userDetails}
};

const createPlace = async (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = new Place({
    title,
    description,
    address,
    creator,
    location: coordinates,
  });

  // Here we are trying to create a user-places relationship
  let user;

  try {
    user = await User.findById(creator); // Checking whether a user exists with the creator id in the database.
  } catch (err) {
    return next(new HttpError(err, 500)); // If checking fails (code failure)
  }

  if (!user) {
    // No user exists with the creator id
    return next(new HttpError("User doesn't exist", 500)); // stop the code execution
  }

  try {
    /* the code will come here if
      1. There was no exception logged.
      2. There exists a user with the mentioned creator id.
    */

    // below queries should complete within one session.
    const sess = await mongoose.startSession(); // this should be with await.
    await sess.startTransaction();
    await createdPlace.save({ session: sess }); // this adds a places document in the places collection.
    /*
      At the same time since we have defined two things:
      1. A place is mapped to a single creator.
      2. A user can have multiple places.
      Below code pushes the createdPlace document (only pushes ID internally)
    */
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
    res.status(200).json({ message: "Successfully added place" });
  } catch (err) {
    return next(new HttpError(err, 500));
  }
};

const updatePlaceByPlaceId = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid; // make sure this is the exact param name that you are putting in places-routes.
  const updatedPlace = {
    ...DUMMY_PLACES.find((place) => place.id === placeId),
  };
  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);
  console.log(updatedPlace);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlaceByPlaceId = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (error) {
    return next(new HttpError(error, 500));
  }

  if (!place) {
    return next(new HttpError("Couldn't delete the place", 404));
  }
  try {
    const sess = await mongoose.startSession();
    await sess.startTransaction();
    await place.remove({ session: sess });
    /*
      In the place document looks for the creator id, because of the mapping, searches in the user collection
      finds the creator id and under places, finds the place id, and removes the place id.
    */
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError(error));
  }
  res.status(201).json({ message: "Deleted the place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceByPlaceId = updatePlaceByPlaceId;
exports.deletePlaceByPlaceId = deletePlaceByPlaceId;
