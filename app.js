//Require
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var fileUpload = require('express-fileupload');

//import routes
var app_routes = require('./routes/app');
var user_routes = require('./routes/user');
var doctor_routes = require('./routes/doctor');
var hospital_routes = require('./routes/hospital');
var login_routes = require('./login');
var search_routes = require('./routes/search');
var upload_routes = require('./routes/upload');

//init vars
var app = express();

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('public'));

//DB conection
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true }, (error, res)=>{
    if(error)
        console.log(error);
        console.log('conectado a la DB hospitalDB en mongoDB');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use('/user', user_routes);
app.use('/login', login_routes);
app.use('/doctor', doctor_routes);
app.use('/hospital', hospital_routes);
app.use('/search', search_routes);
app.use('/upload',fileUpload(), upload_routes);
app.use('/', app_routes);



//escuchar peticiones
app.listen(3000, ()=>{
    console.log('Servidor Node/Express corriendo en puerto 3000: \x1b[36m%s\x1b[0m', 'online');
});