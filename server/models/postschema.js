const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    content:{
        type:String
    },
    contentType:{
        type:String
    },
    question:{
        type:String
    },
    owner:{
        type:String
    },
    imageUrl:{
        type:String
    },
    publicId:{
        type:String
    },
    votes:{
        type:Number
    },
    upvoted:{
        type:Array
    },
    downvoted:{
        type:Array
    },
    ownerFirstName:{
        type:String
    },
    ownerLastName:{
        type:String
    },
    ownerProfilePicture:{
        type:String
    },
    profession:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const userpost = mongoose.model("userpost",postSchema)

module.exports = userpost