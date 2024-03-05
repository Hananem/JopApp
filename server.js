const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json())
// Connect user routes
app.use('/users', userRoutes);
const port = 3000;
//connect to db
const URI = "mongodb://JobApp:JobAPP@ac-omihphx-shard-00-00.r3bip7z.mongodb.net:27017,ac-omihphx-shard-00-01.r3bip7z.mongodb.net:27017,ac-omihphx-shard-00-02.r3bip7z.mongodb.net:27017/?ssl=true&replicaSet=atlas-x4n6bk-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(URI)
.then(() => {
    app.listen(port ,() => {
        console.log("listening on port 3000")
    })
})
.catch((error) => {
  console.log(error)  
})

