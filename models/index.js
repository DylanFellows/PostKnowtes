"use strict";

const mongoose = require('mongoose');
const User = require('./User.js');
const Knowtes = require('./Knowtes.js');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/postknowtes_db";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports = {
    User: User,
    Knowtes: Knowtes
}