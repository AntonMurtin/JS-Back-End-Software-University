const mongoose=require('mongoose');
const bcryp=require('bcrypt');
const {error}=require('../config/constants')

const userSchema=new mongoose.Schema({
    email:{
        type: String,
        required:[true, 'Email is required!'],
        minLength:[10, 'Email shoud be at least 10 characters'],
        unique:true
    },
    password:{
        type: String,
        required:[true, 'Password is required!'],
        minLength:[4, 'Password shoud be at least 4 characters']
    },
   
});
userSchema.virtual('repeatPassword')
.set(function(value){
    if(this.password!==value){
        throw new Error(error.missmatch)
    }
});

userSchema.pre('save',async function(){
const hash=await bcryp.hash(this.password,10);
this.password=hash;
});


const User=mongoose.model('User',userSchema);

module.exports=User;