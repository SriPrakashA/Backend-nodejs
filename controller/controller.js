const dataSchema = require('../model/model');
const bcrypt = require('bcrypt');
const createData  = async(req,res)=>{
    try {
        const hashPassword = await bcrypt.hash(req.body.password,7);
        const userdata = new dataSchema({
           ...req.body,password:hashPassword
        })
        const user = await userdata.save();
        res.json(user);
    } catch (error) {
        res.json(error)
    }
   
}
    

const retiveData = async(req,res)=>{
    try {
        const retrive  = await dataSchema.find({});
        res.json({msg:"All data Retrived",data:retrive})
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
     const {email,password} = req.body;
     const mail = await dataSchema.findOne({email:email});
     if(!mail) return res.json({msg:"Email Not Valid"});
     const pass = await bcrypt.compare(password,mail.password);
     if(!pass) return res.json({msg:"Password Not valid"})
     res.json({msg:"Login Successfully"})
   } catch (error) {
     res.json({msg:"Something wrong"});
   }
    
}
module.exports={createData,retiveData,singleData,updateData,deleteData,deleteAll,loginUser};