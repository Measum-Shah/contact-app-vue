import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a name"],
    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    phone:{
        type: String,
        required: [true, "Please provide a phone number"],
    },
    designation:{
        type: String,
        required: [true, "Please provide a designation"],
    },

},{
    timestamps: true,
})

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
