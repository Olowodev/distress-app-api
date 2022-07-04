const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const distressRoute = require('./routes/distress');
const userRoute = require('./routes/user');







dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connection successful!'))
    .catch((err) => {
        console.log(err);
    });

    app.use(express.json());

    app.use(cors());
    app.use('/api/auth', authRoute);
    app.use('/api/distress', distressRoute);
    app.use('/api/user', userRoute)





app.listen(process.env.PORT || 5000, () => {
    console.log('backend server is running')
})