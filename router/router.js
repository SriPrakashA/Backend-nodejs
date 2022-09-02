const { createData, retiveData, singleData, updateData, deleteData, deleteAll, loginUser } = require('../controller/controller');

const router =require('express').Router();
router.post('/create',createData);
router.get('/retrive',retiveData);
router.get('/onedata/:id',singleData);
router.put('/modify/:id',updateData);
router.delete('/remove/:id',deleteData);
router.delete('/delete',deleteAll);
router.post('/login',loginUser)



module.exports=router;