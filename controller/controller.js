const { MyPractice } = require('../model/model');
const bcrypt = require('bcrypt');
var appData = {
    appStatusCode: 0,
    message: "",
    data: [],
    error: [],
  };
const createData  = async(req,res)=>{
    try {
        const hashPassword = await bcrypt.hash(req.body.password,7);
        const userdata = new MyPractice({
           ...req.body,password:hashPassword
        })
        const user = await userdata.save();
        appData["appStatusCode"] = 0;
        appData["message"] = "Successfully created";
        appData["data"] = user;
        appData["error"] = [];
        res.send(appData);
    } catch (error) {
        res.json(error)
    }
   
}
    

const retiveData = async(req,res)=>{
    try {
        MyPractice.aggregate([
            // {$match:{name:"sri"}},
            { $group:{
                _id:"$_id",
                name:{$first:"$name"},
                age:{$first:"$age"},
                marks:{$first:"$marks"},
                roll_num:{$first:"$roll_num"}
            } }
        ])
        .then((result)=>{
            if (result) {
                appData["appStatusCode"] = 0;
                appData["message"] = "All students";
                appData["data"] = result;
                appData["error"] = [];
                res.send(appData);
            }
        })
        .catch((err)=>{
                appData["appStatusCode"] = 4;
                appData["message"] = "";
                appData["data"] = [];
                appData["error"] = `some error ${err}`;
                res.send(appData);
        })
        
    } catch (error) {
        res.json({msg:"Something Wrong",data:error})
    }

}

const singleData = async(req,res)=>{
    try {
        const getData = await dataSchema.findOne({_id:req.params.id});
        res.json({msg:"One data retrived",data:getData});
    } catch (error) {
        res.json({msg:"Cannot get single data something went wrong",
    data:error})
    }
}
const updateData = async(req,res)=>{
       const hashPassword =await bcrypt.hash(req.body.password,7);
    try {
        const updateFile = await dataSchema.findByIdAndUpdate({_id:req.params.id});
        updateFile.name = req.body.name
        updateFile.email = req.body.email
        updateFile.password = hashPassword
        const updateFiles = await updateFile.save();
        res.json({msg:"Data Updated Successfully",data:updateFiles})
    } catch (error) {
        res.json(error)
    }
} 
const deleteData = async(req,res)=>{
    try {
        const removeData = await dataSchema.findByIdAndDelete(req.params.id);
      res.json({msg:"Removed data successfully"})
    } catch (error) {
        res.json(error);
    }
      
}

const deleteAll = async(req,res)=>{
    try {
        const deleteData = await dataSchema.deleteMany({});
        res.json({msg:"All data are deleted"});
    } catch (error) {
        res.json(error);
    }
}

const loginUser = async(req,res)=>{
   try {
     const {name,password} = req.body;
     const myname = await MyPractice.findOne({name:name});
     if(!myname) return res.json({msg:"name not found"});
     const pass = await bcrypt.compare(password,myname.password);
     if(!pass) return res.json({msg:"Password Not valid"})
     res.json({msg:"Login Successfully"})
   } catch (error) {
     res.json({msg:"Something wrong"});
   }
    
}
module.exports={createData,retiveData,singleData,updateData,deleteData,deleteAll,loginUser};