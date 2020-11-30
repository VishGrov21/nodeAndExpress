const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT;

const server = app.listen(port, () => console.log(`Listening at port: ${port}`));
