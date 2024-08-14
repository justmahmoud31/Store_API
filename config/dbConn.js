import  Sequelize  from "sequelize";

const sequelize = new Sequelize('store-api','root','',{
    host:'localhost',
    dialect : 'mysql',
    port: 3307
     
});

//auth to db
sequelize.authenticate()
.then(()=> console.log('db Connected sucessfully...'))
.catch((err)=> console.log(err));


export default sequelize;