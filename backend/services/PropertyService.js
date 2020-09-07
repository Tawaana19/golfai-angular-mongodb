const escapeStringRegexp = require('escape-string-regexp');
const Listing = require('../models/Listing');

async function getPropertyDetails(criteria) {
    console.log("Inside getPropertyDetails")
    const reg = escapeStringRegexp(criteria);
    let propertyDetails = ''
    await Listing.find({ "$or": [
        { "Record Date": { $regex: reg } }, 
        { "Book Type": { $regex: reg } }, 
        { "Legal Description": { $regex: reg } }
    ] }).then(
        propDetails => {
            if (!propDetails) {
                throw new Error("Property not found!");
            }
            propertyDetails = propDetails;
        }
    );
    return propertyDetails
}

module.exports.getPropertyDetails = getPropertyDetails;