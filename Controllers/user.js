const User = require(`../config/mongoose.model`).userModel;

const alluser = async(req, res)=>{
    try{
        const users = await User.find();
        return res.status(200).json({users})
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err});
    }
}

module.exports = {
    alluser: alluser
}