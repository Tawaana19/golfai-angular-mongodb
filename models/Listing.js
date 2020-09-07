const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    "_id": Schema.ObjectId,
    "Record Date": {
        type: String,
        trim: true,
        required: [true, 'Record Date required']
    },
    "Book Type": {
        type: String,
        trim: true,
        required: [true, 'Book Type required']
    },
    "Book / Page": {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Book / Page required']
    },
    "Instrument": {
        type: String,
        required: [true, 'Instrument required']
    },
    "Secondary": {
        type: String,
        required: [true, 'Secondary required']
    },
    "Number of Pages": {
        type: String,
        required: [true, 'Number of Pages required']
    },
    "Doc Type": {
        type: String,
        required: [true, 'Doc Type required']
    },
    "Grantor": {
        type: String,
        required: [true, 'Grantor required']
    },
    "Legal Description": {
        type: String,
        required: [true, 'Legal Description required']
    },
    "filename": {
        type: String,
        required: [true, 'filename required']
    }
});

module.exports = Listing = mongoose.model("listings", ListingSchema);