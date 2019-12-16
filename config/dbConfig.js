var Sequelize = require("sequelize");

var sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
	host: process.env.DB_HOST,
    dialect: "mysql",
    logging:false
});

sequelize.authenticate().then(
	function(){
	//console.log("Databse connection Sucess");
})
.catch(
	function(err){
		next(err);
	//console.error("error",err);
});

module.exports={
    Sequelize,sequelize
}

