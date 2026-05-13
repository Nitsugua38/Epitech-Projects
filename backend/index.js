require("dotenv").config();
var express = require('express');
var cors = require('cors');
var app = express()
const { jobs } = require("./routes/jobs");
const { register } = require("./routes/register");
const { login } = require("./routes/login");
const { applyJob } = require("./routes/applied");
const { getDataFeature } = require("./DATA/datafeature");
const { getProfile } = require("./routes/user");
const { upload, uploadCv } = require("./routes/cv");





app.use(cors())
app.use(express.json());





//jobs list
app.get('/api/jobs', jobs);

//register
app.post('/api/register', register);

//login
app.post('/api/login', login);

//applied
app.post('/api/jobs/apply', applyJob);

//data feature
app.get('/api/datafeature', getDataFeature);

//user profile
app.get('/api/user', getProfile);

//cv
app.post('/api/user/cv', upload.single('cv'), uploadCv);


app.listen(process.env.PORT, function () {
    console.log(`web server listening on port ${process.env.PORT}`)
})