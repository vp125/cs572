const mongoose=require("mongoose");
require("./job-model");

const dbName="meanJobs";
const dbUrl="mongodb://localhost:27017/"+dbName;

mongoose.connect(dbUrl,{useUnifiedTopology:true,useNewUrlParser:true});

process.on("SIGINT", function() {
    console.log("Application is interrupted");
    process.exit(0);
});

process.on("SIGTERM", function() {
    console.log("Application is terminated");
    process.exit(0);
});

process.once("SIGUSR2", function() {
    console.log("Application is restarted");
    process.kill(process.pid);
});

mongoose.connection.on("connected", function() {
    console.log("MongoDB connected");
});

mongoose.connection.on("disconnected", function() {
    console.log("MongoDB disconnected");
});

mongoose.connection.on("error", function(err) {
    console.log("MongoDB error ",err);
});

