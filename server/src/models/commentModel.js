const { Schema } = require('mongoose');

const commentSchema = new Schema({
    lastModified: Date,
    text: String
});

commentSchema.pre('save', function(next){
    this.lastModified = new Date();
    next();
})

module.exports = commentSchema;
