const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const servicePort = 8081;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
  res.json({ message: `Halo Camin - I'm BLUE` });
});

app.use('/penugasan3', router);

app.listen(servicePort, () => {
  console.log(`Service listening on port ${servicePort}`);
});
