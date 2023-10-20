const mongoose=require('mongoose');

const animalSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Name is required!'],
        minLength:[2, 'Name shoud be at least 2 characters'],
        unique:true
    },
    kind:{
        type: String,
        required:[true, 'kind is required!'],
        minLength:[3, 'kind shoud be at least 3 characters'],
    },
    image:{
        type:String,
        required:[true, 'ImageUrl is required!'],
        match:[/^https?:\/\//,' Invalid URL!']

    },
    years:{
        type:Number,
        required:[true, 'Years is required!'],
        min:[1,'Years must min 1 and max 100'],
        max:[100,'Years must min 1 and max 100']

    },
    need:{
        type: String,
        required:[true, 'Need is required!'],
        minLength:[3, 'Need shoud be at least 3 characters'],
        maxLength:[20,'Need shoud be max 20 characters']
    },
   location:{
        type: String,
        required:[true, 'Location is required!'],
      minLength:[5, 'Location shoud be at least 5 characters'],
      maxLength:[15,'Location shoud be max 15 characters']
    },
    description:{
        type:String,
        required:[true, 'Description is required!'],
        minLength:[5,'Description shoud be at least 5 characters'],
        maxLength:[50,'Description shoud be max 50 characters']
    },
    donations:[{
        type: mongoose.Types.ObjectId,
        ref:'User'
    }],
    owner:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    }

});

const Animal=mongoose.model('Animal',animalSchema);

module.exports=Animal