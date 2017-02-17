const express = require('express'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  app = express();

const PORT = process.env.PORT || 8080;

var options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['htm', 'html'],
  index: 'index.html',
  lastModified: true,
  maxAge: '1d',
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
    res.header('Cache-Control', 'public, max-age=1d');
  }
};

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/build', options));
app.use('*', express.static(__dirname + '/build', options));

app.get('/.well-known/acme-challenge/:content', function(req, res) {
  res.send(process.env.CERTBOT_RESPONSE);
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
