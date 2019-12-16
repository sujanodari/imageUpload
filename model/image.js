var db = require ("../config/dbConfig.js");
var image=db.sequelize.define("image",{
    //attributes
    id:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    imageLocation:{
        type:db.Sequelize.TEXT,
        allowNull:false
    }
},{
    freezeTableName:true,
    tablesName:"image"

});


image.sync({force:false})
.then(function(){

})
.catch(function(err){
    console.log(err);
});


module.exports=image;
