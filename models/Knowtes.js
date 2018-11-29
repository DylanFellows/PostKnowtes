const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const KnowtesSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Title is Required"
    },
    subject: {
        type: String,
        trim: true,
        required: "Subject is Required"
    },
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var Knowtes = mongoose.model('Knowtes', KnowtesSchema);

module.exports = Knowtes;