const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('./db.js');

const routes=require('./routes/routes.js');
const app=express();

app.use(bodyParser.json());
app.use(cors({origin:'https//localhost:4200'}));
app.listen(3000,()=>{
    console.log("server connected")
});
app.use('/employees',routes);