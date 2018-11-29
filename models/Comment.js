const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const CommentsSchema = new Schema({
    body: {
        type: String,
        trim: true,
        required: "Body is Required"
    },
    fromUserId: 
        {
          type: Schema.Types.ObjectId,
          ref: "User"
    },
    toUserId:
        {
          type: Schema.Types.ObjectId,
          ref: "User"
    }
});

// This creates our model from the above schema, using Mongoose's model method
var Comments = mongoose.model('Comments', CommentsSchema);

// Export the Tweet model
module.exports = Comments;