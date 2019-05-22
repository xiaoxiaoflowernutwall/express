const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({	extended: true}));

const CONNECTION_URL = "mongodb+srv://root:root@lab10-hsxde.mongodb.net/test?retryWrites=true";
const DATABSE_NAME = "lab10";

var database, collection;

app.get("/test", (request, response) => {response.send("This is working")});

app.post("/notes",(request, response) =>{
	MongoClient.connect(CONNECTION_URL,{useNewUrlParser:true},(error,client)=>{
		if (error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABSE_NAME);
		collection = database.collection("Notes");

		collection.insert(request.body,(error,result)=>{
			if (error) {
				return response.statue(500).send(error);
			}
			response.send(result.result);
		});
	});
});

app.put('/notes/:id',(request,response) =>{
	MongoClient.connect(CONNECTION_URL,{useNewUrlParser:true},(error,client)=>{
		if (error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABSE_NAME);
		collection = database.collection("Notes");

		collection.find({}).toArray((error,result) =>{
			if (error) {
				response.send(result[numberID]._id);
				throw response.statue(500).send(error);
			}

			var numberID = parseInt(request.params.id);

			if (numberID >= result.length) 
			{
				response.send("Not enough elements in database")
			} 
			else {
				collection.update({"_id":result[numberID]._id},{$set:{"body":request.body.body}})
				response.send("Updated!");
			}
		})
	});
});

app.get("/notes",(request, response) =>{

	MongoClient.connect(CONNECTION_URL,{useNewUrlParser: true},(error,client)=>{
		if (error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABSE_NAME);
		collection = database.collection("Notes");

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
		collection = database.collection("Notes");

		collection.find({}).toArray((error, result)=>{
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

app.delete('/notes/:id',(request, response)=>{
	MongoClient.connect(CONNECTION_URL,{useNewUrlParser:true},(error,client)=>{
		if (error) {
			response.send(error);
			throw error;
		}
		database = client.db(DATABSE_NAME);
		collection = database.collection("Notes");

		collection.find({}).toArray((error,result)=>{
			if (error) {
				return response.statue(500).send(error);
			}

			var numberID = parseInt(request.params.id);

			if (numberID >= result.length) {
				response.send("Not enough elements in database");
			} 
			else 
			{
				collection.remove({"_id":result[numberID]._id}, (err,result) =>{
					if (err) {
						response.send(result[numberID]);
						throw err;
					}
					response.send('user deleted');
				});
			}
		})
	});
});


module.exports = app;
