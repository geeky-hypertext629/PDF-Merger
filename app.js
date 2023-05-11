const express=require('express');
const path = require('path');
const app = express();
const multer  = require('multer');
const {mergepdfs} = require('./merge')
const upload = multer({ dest: 'uploads/' })
const port = 3000;
app.use('/static', express.static('public'))
app.listen(port,()=>{
    // res.sendFile(__dirname + "index.html");
    console.log("Server running at port 3000");
})

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
})
app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=>{
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    let d=await mergepdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
    res.redirect(`http://localhost:3000/static/${d}.pdf`);
    // console.log(req.files)
  })
app.post("/",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
})
