import  express from 'express'
import sequelize from './config/dbConn.js'
import userRouter from './routers/user.routes.js'
import { globalErrorHandling } from './middlewares/globalErrorHandling.js'
const app = express()
app.use(express.json())
const port = 3000
app.use('/users',userRouter)
//handle unhandled routes
app.use('*',(req,res,next)=>{
  next(new AppError (`route not found ${req.originalUrl}`, 404))
  
})

app.use(globalErrorHandling)
process.on('unhandledRejection',(err)=>
{
  console.log('error..',err)
})

sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });