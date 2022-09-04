function response(res, status, message, result, errors){
    var result = {
        status: message,
        result: result,
        errors: errors
    }
    res.setHeader("Content-Type", "application/json");
    res.writeHead(status);
    res.end(JSON.stringify(result));  
}

module.exports = response