import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number"],
    },
    designation: {
        type: String,
        required: [true, "Please provide a designation"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // associate contact with a user
        required: true,
    },
}, {
    timestamps: true,
});

// Avoid OverwriteModelError on hot reload
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
