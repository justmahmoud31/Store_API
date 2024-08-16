import { DataTypes,Model } from "sequelize";
import sequelize from "../config/dbConn.js";
class product extends Model{}
product.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    product_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    imagePath:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{
    sequelize,
    modelName:'product',
    tableName:'product',
    timestamps: false
});
export default product;