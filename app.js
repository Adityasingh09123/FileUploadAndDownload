const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require("fs");

const app = express();
app.use(fileUpload());

// here we get or select the file
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');

})

//Here we upload or post the file
app.post('/',(req,res)=>{
        const fileData = JSON.stringify(req.files);
        const orgData = JSON.parse(fileData);
        // console.log(orgData);
        const file = req.files.file;
        const filename = file.name;
        console.log(`File name is: ${filename}`);

        if(req.files){
            file.mv('./uploads/'+filename, function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send("Video Uploaded successfully.....");
                }
            })
        }
        else{
            res.send(`Please Select the video File!`)
        }

        // function to download the uploaded file
        
        app.get("/download", function (req, res) {
            res.download("./uploads/"+filename,function(err){
                if(err){
                    console.log(err);
                }
            });    
        });
        
})


app.listen(5000,()=>{
    console.log("Server is created...");
})