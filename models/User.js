const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email:{type: String, required: true, index: true, unique: true},
        fullname:{ type: String , required: true},
        password: {type: String, required: true},
        location: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        profileImg: {type: String },
        closeContacts: [
            {
                name:{
                    type: String,
                    required: true
                },
                number:{
                    type: String,
                    required: true
                }
            }
        ]
    },
    { timestamps: true}
);

module.exports = mongoose.model('User', UserSchema)