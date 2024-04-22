const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    phonenumber:{type : String,default:"+251927632422"},
    location: { type: String,default:"Addis abeba"},
    isAdmin :{type:Boolean, default: true},
    isAgent: { type: Boolean, default: false },
    skill: { type: Array, required: false },
    Profile: {
        type: String, required: false,
        default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);