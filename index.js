const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

//const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now ()}-${file.originalname}`);
    },
});

const upload = multer({storage:storage});

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

let uploadedFiles = [];
app.get("/", (req,res) => {
    return res.render("homepage", {uploadedFiles});
});

app.post('/upload', upload.single('profileimage'),(req, res) =>{
    console.log(req.body);
    console.log(req.file);
    if (req.file) {
        uploadedFiles.push(`/uploads/${req.file.filename}`);
    }
    return res.redirect("/");
})

app.listen(PORT, () => {
    console.log("Server is Running !!");
    
});