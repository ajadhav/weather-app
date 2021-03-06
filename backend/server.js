const express = require('express');
const createError = require('http-errors');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
const app = express();
const port = process.env.PORT || 3001;
// const helmet = require('helmet');
require('dotenv').config({ path: './../.env' });
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         'script-src': [
//           "'self'",
//           "'unsafe-inline'",
//           'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js',
//           'https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.js',
//         ],
//       },
//     },
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api = require('./api');
app.use('/api', api);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json({ message: err.message, error: err });
// });

// Serve static files from the React frontend app
const buildPath = path.join(__dirname, '../frontend/build');
app.use(
  '/',
  expressStaticGzip(buildPath, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
  })
);
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

//configure heroku to build frontend react app
// "heroku-postbuild": "cd client && npm install && npm run build"

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;
