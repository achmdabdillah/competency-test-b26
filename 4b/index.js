const http = require('http');
const express = require('express');
const path = require('path');
const session = require('express-session')

const app = express();
const hbs = require('hbs');


const provRoute = require('./routes/prov')
const districtRoute = require('./routes/kab')

const dbConnection = require('./connection/db')

app.use(express.static('express'));
app.use(express.urlencoded({ extended: false }));

// set engine
app.set('view engine', 'hbs');

// set views location
app.set('views', path.join(__dirname, 'views'));

// register views province
hbs.registerPartials(path.join(__dirname, 'views','provinsi'))

// register views district
hbs.registerPartials(path.join(__dirname, 'views','kabupaten'))

// register views partials
hbs.registerPartials(path.join(__dirname, 'views','partials'))

// // static
app.use('/static', express.static(path.join(__dirname, 'style')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(
    session({
        cookie: {
            maxAge: 2 * 60 * 60 * 1000,
            secure: false,
            httpOnly: true
        },
        store: new session.MemoryStore(),
        saveUninitialized: true,
        resave: false,
        secret: 'secretValue'
    })
);

// render index page
app.get("/", function (req, res) {
    const query = "SELECT * FROM provinsi_tb"

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;
  
      conn.query(query, (err, data) => {
        if (err) throw err;
        const provinsi = data

        res.render('index', {title: 'Provinsi', provinsi})
      });
      conn.release();
    });
  });

// use province route
app.use('/province', provRoute);
app.use('/district', districtRoute);

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server running on port: ${PORT}`))