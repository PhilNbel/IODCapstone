const multer = require('multer') 
//A file for a future extension, it isn't used
const storage = multer.diskStorage({
    destination: 'public/img/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})
    
const uploadFile = multer({ storage: storage }).single("file")

module.exports = { uploadFile };