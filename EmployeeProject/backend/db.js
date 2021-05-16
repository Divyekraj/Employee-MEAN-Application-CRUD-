const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/meanDB',(err)=>{
    if(!err)
    {
        console.log("connect To DB")
    }
    else{
        console.log("not connect"+err)
    }
})
module.exports=mongoose;