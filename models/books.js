const mongoose = require("mongoose"); 
 


const bookSchema = new mongoose.Schema({
    title: {
        type:String, 
        required:true, 
       
    },
    description :{
        type:String, 
    }, 
    publishDate:{
        type:Date,
        required:true, 
    },
    pagecount:{
        type:Number, 
        required:true, 
    }, 
      coverImage: {
        type: Buffer,
        required:true
      
      },
      coverImageType: {
        type: String,
        required:true, 
    
      },
    createdAt:{
        type:Date, 
        default:Date.now(), 
        required:true
    },
    author:{
        type: String,
        required:true, 
        ref:"author"
    }


}) 
bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})
                         
module.exports = mongoose.model('book', bookSchema); 

