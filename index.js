const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const {PORT,DB}=process.env;
const mongoose = require('mongoose');
const router = require('./router/router');
mongoose.connect(DB,(err)=>{
if(err) {
    console.log(err,"Db is not connected")
}
else{
    console.log("DB connected Successfully");
}

})
// .then(()=>{
//     console.log("DataBase connected Successfully");
// })
// .catch((err)=>{
//     console.log("Db is not connected");
// })
app.use(express.json());
app.use('/api',router);





app.listen(5000,()=>{
    console.log("Server is running on port:",PORT);
})