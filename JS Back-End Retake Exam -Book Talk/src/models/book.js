const mongoose=require('mongoose');

const bookShema= new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Name is required!'],
        minLength:[2, 'Name shoud be at least 2 characters']
    },
    author:{
        type:String,
        required:[true, 'Author is required!'],
        minLength:[5, 'Author shoud be at least 5 characters']
    },
    image:{
        type:String,
        required:[true, 'ImageUrl is required!'],
        match:[/^https?:\/\//,' Invalid URL!']
    },
    review:{
        type:String,
        required:[true, 'Review is required!'],
        minLength:[10,'Review shoud be at least 10 characters'],
    },
    genre:{
        type:String,
        required:[true, 'Genre is required!'],
        minLength:[5,'Genre shoud be at least 5 characters'],
    },
   star:{
        type:Number,
        required:[true, 'Star is required!'],
        min:[1,'Star must min 1 and max 5'],
        max:[5,'Star must min 1 and max 5']
    },
    
    
    wishing:[{
        user:{
           type: mongoose.Types.ObjectId,
           ref:'User'
        },
    }],
    owner:{
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },

});

const Book=mongoose.model('Book', bookShema);

module.exports=Book;