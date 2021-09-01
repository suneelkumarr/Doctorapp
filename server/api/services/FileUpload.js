const fileUpload = (file, uploadPath) =>{
    const extension = file.name.split('.')[1]
    const filename = 'profile_' + Date.now() + '.' + extension
    path = uploadPath + filename
    const moveFile = file.mv(path)

    if(!moveFile){
        return res.status(501).json({
            message:"file upload error"
        })
    }

    console.log(moveFile);
    return filename
}

module.exports ={
    fileUpload
}