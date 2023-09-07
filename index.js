import  Express   from "express";
import mongoose  from "mongoose";
import cors from "cors"
const app=Express()
app.use(cors())
mongoose.connect("mongodb://localhost:27017/ahmed")
.then(()=>console.log("object connected to the mongoose"))
.catch(()=>console.log("mongoose error "))
app.use(Express.json())
const sc=mongoose.Schema({
    name:Number,
   
})
const mo=mongoose.model("pagination",sc)
app.get("/api",pagination(mo),(req,res)=>{
    res.json(res.pagination)
   
})

function pagination(mo){
    return async(req,res,next)=>{
        const x= await mo.find()
        const page=parseInt(req.query.page)
        const limit=parseInt(req.query.limit)
        const total=await mo.countDocuments()
        const startIndex=(page-1)*limit
        const endIndex=page*limit
        const result={}
        if(endIndex<x.length){
            result.next={
                page:page+1,
                limit:limit
            } 
        }
       if(startIndex>0){
        result.prev={
            page:page-1,
            limit:limit
        }
       }
         result.result=x.slice(startIndex,endIndex)
        // result.result=x.find().limit(limit).skip(startIndex).exec
     
      res.pagination=result
      next()
    }
}
app.listen(1000,()=>console.log("server started"))
