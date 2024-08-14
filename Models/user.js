import { DataTypes } from "sequelize";
import sequelize from "../config/dbConn.js";

const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        unique:true,
        primaryKey :true,
        autoIncrement: true,
      
    },
    userName:{
        type:DataTypes.STRING
    },

    email:{
        type:DataTypes.STRING,
        unique:true
    }
    ,
    password: {
        type:DataTypes.STRING
    },
    role:{
        type: DataTypes.ENUM('user', 'admin', 'supervisor'),
        defaultValue : 'user'
    },
    otp:{
        type:DataTypes.STRING
    },
    otpExp :{
        type:DataTypes.TIME
    },
    confirmEmail:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }

})


export default User;
