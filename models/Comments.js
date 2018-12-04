const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    body: {
        type: String,
        trim: true,
        required: "Body is Required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    fromUserId: 
        {
          type: Schema.Types.ObjectId,
          ref: "User"
    },
    toKnowtesId:
        {
          type: Schema.Types.ObjectId,
          ref: "Knowtes"
    }
});

var Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;