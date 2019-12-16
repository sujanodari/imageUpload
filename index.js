"use strict"
const test = require("express");
require("dotenv").config();
var imageController=require("./controller/imageController.js");

var app=test();
var multer  = require("multer");
var storage = multer.diskStorage(
    {
        destination: "./uploads/",
        filename: function ( req, file, cb ){
            cb( null, file.originalname );
        }
    }
);
//multer is used to upload the file
var upload = multer( { storage: storage } );




var swaggerJSDoc=require("swagger-jsdoc");//actual for documentation
var swaggerUI=require("swagger-ui-express");//for viewing documentation

var swaggerDefinition={
info: {
    title:"imageUpload",
    version:"0.0.1",
    description:"This is node web application to upload images"
},
securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            name: "authorization",
            scheme: "bearer",
            in: "header"
        }
    },
host:process.env.DB_HOST+":"+process.env.APP_PORT,
basePath:"/"

};

var swaggerOptions={
    swaggerDefinition,
    apis:["./index.js"]
};

var swaggerSpecs=swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerSpecs));


/**
 * @swagger
 * /single:
 *  post:
 *   tags:
 *    - Image
 *   description: Upload single image
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/form-data
 *   parameters:
 *    - name: image
 *      in: formData
 *      type: file
 *      required: true
 *      description: This is image to be upload
 *   responses:
 *    201:
 *     description: Upload successful
 *    500:
 *     description: Internal Error
 */


app.post("/single",upload.single("image"),imageController.sValidation,imageController.sUpload);


/**
 * @swagger
 * /multiple:
 *  post:
 *   tags:
 *    - Image
 *   description: Upload multiple images
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/form-data
 *   parameters:
 *    - name: images
 *      in: formData
 *      type: file
 *      required: true
 *      description: This is image to be upload
 *   responses:
 *    201:
 *     description: Upload successful
 *    500:
 *     description: Internal Error
 */


var multipleFiles=upload.fields([{
    name:"images", maxCount:4
}
]);
app.post("/multiple",multipleFiles,imageController.mUpload);



//error handling middleware first parm err
app.use(function(err,req,res,next){
    res.status(500);
    res.json({
    status:500,
    message:err.message
    });
  
    });



//for unnecessary request
    app.use("/*",function(req,res){
        res.status(404);
        res.json({
            status:404,
            message:"Page not found"
            });
    });
app.listen(process.env.APP_PORT);
