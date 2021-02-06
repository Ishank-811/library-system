const express= require("express"); 
const methodoverride = require("method-override"); 
const port = 5050
const app = express(); 
app.use(methodoverride('_method'));
const bodyParser  =require("body-parser"); 
const indexrouter  = require('./routes/index'); 
const authorrouter  = require('./routes/author'); 
const bookrouter  = require('./routes/books'); 
const mongoose = require("mongoose"); 
const expressEjsLayout = require("express-ejs-layouts");
mongoose.connect("mongodb://localhost:27017/author", {useNewUrlParser:true , 
useUnifiedTopology:true , useCreateIndex:true}).then(()=>{
    console.log(`connection is sucessfull`); 
}).catch((e)=>{
    console.log(e); 
}); 
app.set('view engine', 'ejs'); 
app.set('views', __dirname+'/views'); 
app.set('layout', 'layouts/layouts'); 
app.use(expressEjsLayout);  
app.use("/" , indexrouter); 
app.use(bodyParser.urlencoded({limit:'10mb' , extended:false})); 
app.use("/author" ,authorrouter ); 
app.use("/books", bookrouter); 
app.use(express.static('public')); 
app.listen(port,()=>{
    console.log(`starting at port number ${port} `); 
})

