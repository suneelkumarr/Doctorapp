const fs = require('fs');

const fileDelete = (destination, file) =>{
    fs.unlink(destination + file, function (err){
        if(err){
            console.error(err)
        }
        return
    })
}

module.exports ={
    fileDelete
}