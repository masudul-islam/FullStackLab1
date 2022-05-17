const router = require("express").Router();
const { append } = require("express/lib/response");
const { ObjectId } = require("mongodb");
const signale = require("signale");
const { await } = require("signale/types");
const userModel = require("../User");

router.get("/users" ,async (req,res) =>{
    try{
        const data = await userModel.find();
        res.status(200).json(data)
    }catch(erro){
        res.status(404).json({message: message.erro})
    }
})

router.get("/userID/:id", async (req,res) => {
    // check if id is existing 
    try{
        const getUserID = req.params.id;
        const id = await userModel.findOne({id:getUserID});
        if(!id){
            return res.status(400).send({ message: "Not found user info with id " + getUserID });
        }else{
            res.json(id)
        }
    }catch{
        res.status(500).send({messege : " Error retrieving user info with id=" + getUserID })
    }
})

router.put("/update/:id" , async (req,res) => {
    
        const getId = req.params.id;
        
        console.log("The id is ",getId)
        const checkId =  await userModel.findOne({id:getId});  // it will return object
        console.log(checkId)
        // console.log(checkId._id)
        
        if(checkId === null){
            res.status(404).send({
            message: `Cannot update user data with id=${getId}. Maybe user was not found!`
        })}else{
            const updatedData = req.body;
            signale.success("user data updated successfully")
            console.log("The update data is " , updatedData)
            const options = { new: true };
            const result = await userModel.findByIdAndUpdate(checkId._id, updatedData, options)
            res.status(200).send(updatedData) 
        }    
})

router.delete("/remove/:id" , async(req,res) => {

    const id = req.params.id;
    const checkId =  await userModel.findOne({id:id});  // it will return object

    if(checkId === null){
        res.status(404).send({
        message: `Cannot delete user info with id=${id}. Maybe user was not found!`
    })}else{
        const removeUser = await userModel.remove(checkId);
        // res.json({message: "the user deleted "})
        res.status(200).send({
            message: "User was deleted successfully!"
          });
    }
})

router.post("/postUser" ,async (req,res) => {
    const data = new userModel (req.body);
    const getUserID = req.body.id;
    const checkId =  await userModel.findOne({id:getUserID});
    if(checkId === null){
        data.save()
        .then(userModel => {
            console.log("User saved" , userModel)
            res.status(200).json({"success" : true})
        }).catch (error => {
            res.status(400).json({message:"There is someting wrong with posting data into DB"})
            console.log(signale.error("There is someting wrong with posting data into DB"));
        })
    }else{
        res.status(409)
        .send({
            "success" : false})
    }
})


module.exports = router;