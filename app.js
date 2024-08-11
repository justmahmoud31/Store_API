import  express from 'express'
import sequelize from './config/dbConn.js'
const app = express()
app.use(express.json())
const port = 3000


sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });