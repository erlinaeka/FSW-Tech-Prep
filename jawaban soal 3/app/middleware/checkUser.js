const authorization = require('../library/generateValidateJWT');
const response = require('../view/response');

async function verifToken(req, res, next){
    try{
        let auth    = req.headers["authorization"];
        if(auth){
            try {
                let auth    = req.headers["authorization"];
                let token   = auth.slice(7);
                var tokenVerify = authorization.verifyJWT(token);
                // console.log('AUTH', tokenVerify)
                var userID = tokenVerify.userID;
                // console.log("INI USER ID", tokenVerify)
                //check ini
                if(userID!=null){
                    req.user = userID;
                    next();
                }else{
                    response(res, 404, "Failed, User not found", {}, {})
                }
            }catch(err){
                response(res, 404, "Failed, Token Failed", {}, {})
            }
        }else{
            response(res, 400, "Failed, Token Required", {}, {})
        }

    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    verifToken,
}