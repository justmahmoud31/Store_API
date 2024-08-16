import Joi from "joi";
const productSchema = Joi.object({
    product_name:Joi.string().required(),
    price : Joi.number().required(),
    description:Joi.string().optional(),
    imagePath:Joi.string().required()
});
export default productSchema;