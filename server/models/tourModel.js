const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    title:String,
    description:String,
    name:String,
    creator:String,
    tags:[String],
    imageFile:String,
    likes:{type:[String], default:[]}
},
{
    timestamps:true
}
)

module.exports = mongoose.model('Tour', tourSchema)