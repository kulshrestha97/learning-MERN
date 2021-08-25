// It is a good practice to first import the core modules and system modules then leave a line and then import the user made modules
const express = require('express');
const bodyParser = require('body-parser');
const {check} = require('express-validator')
const placesRoutes = require('./routes/places-routes');



const app = express();

app.use(bodyParser.json());
app.use('/api/places',placesRoutes);
app.use('/api/users', userRoutes);
// This is a special middleware that is recognised by express because of the first argument 'error'. 
app.use((error, req, res, next) => {
    if(res.headerSent)
    {
        next(error);
    }
    res.status(error.code || 500);
    res.json(error.message || "Server Error");
})




app.listen(5000);