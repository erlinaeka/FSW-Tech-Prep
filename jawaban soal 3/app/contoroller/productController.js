const response = require('../view/response');
const cloudinary = require('../library/cloudinary');
const ProductModel = require('../models/products');
const  ObjectId = require('mongodb').ObjectId;

async function addProduct(req, res){
    try{
        // Upload image to cloudinary
        const { name, price } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path);
        // hasilnya di = result.url
        const data = new ProductModel({
            name, 
            price, 
            imageurl: result.url,
            created_at: Date.now(), 
            updated_at: Date.now()
        });

        const dataToSave = await data.save();
        response(res, 200, "OK", dataToSave, {});

    }catch(error){
        res.status(400).json({message: error.message});
    }
};

async function getAllProduct(req, res){
    try{
        const data_product = await ProductModel.find();
        response(res, 200, "OK", data_product, {});
    }catch(err){
        res.status(400).json({message: error.message});
    }
};

async function getProduct(req, res){
    try{
        const { id } = req.params;
        const data_product = await ProductModel.find({_id: id});
        console.log(data_product.length);
        if(data_product.length==1){
            response(res, 200, "OK", data_product[0], {});
        }else{
            response(res, 200, "Product with that id cant found", {}, "Product cant found");
        }
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

async function updateProduct(req, res){
    try{
        const { id } = req.params;
        const { name, price } = req.body;
        const update_product = await ProductModel.updateOne({_id: new ObjectId(id)}, {$set: {name: name, price: price}});
        const data_product = await ProductModel.find({_id: id});
        response(res, 200, "OK", data_product, {})
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

async function deleteProduct(req, res){
    try{
        const { id } = req.params;
        const delete_product = await ProductModel.deleteOne({_id: new ObjectId(id)});
        if(delete_product.deletedCount===1){
            response(res, 200, "OK", {"message": `${id} deleted`}, {})
        }else{
            response(res, 200, "Product with that id cant found", {}, "Product cant found");
        }
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
}