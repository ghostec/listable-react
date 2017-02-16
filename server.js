var express = require('express');
var app = express();

app.use(express.static(__dirname + '/build'));

const PORT = process.env.PORT || 8080;

app.get('/.well-known/acme-challenge/:content', function(req, res) {
  res.send(process.env.CERTBOT_RESPONSE);
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
