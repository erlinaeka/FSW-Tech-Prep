const UserModel = require('../models/users');
const response = require('../view/response');
const authorization = require('../library/generateValidateJWT');
const bcrypt = require("bcrypt");

async function login(req, res){
    try{
        // cari data didatabase dari emailnya
        const { email, password } = req.body;
        const data_user = await UserModel.find({email})
        // 1. kalo emailnya ada lanjut ke ngecek passswordnya sesuai nggak
        if(data_user.length>=1){
           //    1.1 kalo passwordnya sesuai maka generate TOKEN dan kirimkan status berhasil
            const password_digest = bcrypt.compareSync(password, data_user[0].password_digest);
            if(password_digest===true){
                const token = authorization.generateJWT(data_user[0]._id);
                response(res, 200, "OK", {"access_token": token}, {});
            }else{
                response(res, 400, "Login Failed, password salah", {}, {});
            }
        }else{
        // 2. kalo emailnya gaada beri status yang email tidak terdaftar
            response(res, 400, "Login Failed, Alamat email belum terdaftar", {}, {});
        }
        //    1.2 kalo passwordnya nggak sesuai kirimkan status ga sesuai
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

async function register(req,res){
    try{
        // //tangkap resbody
        const { name, email, password } = req.body;
        //save ke database
        const data = new UserModel({
            name, 
            email, 
            password_digest: bcrypt.hashSync(password, 10),
            created_at: Date.now(), 
            updated_at: Date.now()
        });

        const dataToSave = await data.save();
        response(res, 200, "OK", dataToSave, {});

    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    login,
    register
}