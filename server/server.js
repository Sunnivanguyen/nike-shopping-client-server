const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const connectMysql = require('./src/configs/db.config');

// const upload = require('./src/middlewares/uploadFile');

const port = process.env.APP_PORT || 3000;

app.listen(port, async () => {
  try {
    await connectMysql.authenticate();
    // console.log(upload, 'upload');
    console.log('connect mysql successfully');
    console.log(`App listen on port http://localhost:${port}`);
  } catch (error) {
    console.error('err', error);
  }
});
