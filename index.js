const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({	extended: true}));

app.get("/notes",(request, response) =>{

	MongoClient.connect(CONNECTION_URL,{useNewUrlParser: true},(error,client)=>{
		if (error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABSE_NAME);
		connection = database.collection("Notes");

		collection.find({}).toArray((error,result)=>{
			if (error) {
				return response.statue.send(error);
			}
			response.send(result);
		});
	});
});

app.get("/notes/:id",(request, response) => {

	MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error,client)=>{
		if (error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABSE_NAME);
		collection = database.connection("Notes");

		connection.find({}).toArray((error, result)=>{
			if (error) {
				return response.statue(500).send(error);			
			}

			var numberID = parseInt(request.params.id);

			if(numberID >= result.length)
				response.send("Not enough elements in database")
			else
				response.send(result[numberID]);
		});
	});
});

const CONNECTION_URL = "mongodb+srv://admin:<password>@cluster0-vidvh.mongodb.net/test?retryWrites=true";
const DATABSE_NAME = "Clusters0";

app.post("/notes",(request,response) =>{

	MongoClient.connect(CONNECTION_URL,{useNewUrlParser:true},(error,client)=>{
		if(error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABSE_NAME);
		connection = database.connection("Notes");

		connection.insert(request.body,(error,result) =>{
			if(error) {
				return response.statue(500).send(error);
			}
			response.send(result.result);
		});
	});
});

module.exports = app;
