import Contact from '../models/contactModel.js';
import asyncHandler from "express-async-handler"
// get all contacts logic
// route GET /api/contacts


import express from 'express';

const getContacts = asyncHandler( async(req,res)=>{
    const contacts = await Contact.find();
    res.status(200).json({
        message: "Get All Contacts",
        contacts: contacts,
    });
})


// get contact with an ID logic
// route GET /api/contacts/:id

const getContactsByID=  asyncHandler( async (req,res)=>{
   const contact = await Contact.findById(req.params.id);
   if(!contact){
    res.status(404);
    throw new Error("Contact not found")
   }
   res.status(200).json({
   "message" : `Contact found`,
   contact
   })

})

// post contact logic
// route POST /api/contacts/

const postContact= asyncHandler( async(req,res)=>{
    const {name,email,phone,designation} = req.body;
if (!name || !email || !phone || !designation) {
    const error = new Error("Please provide all the required fields: name, email, phone, designation");
    error.statusCode = 400;
    throw error;
}
    const newContact = await Contact.create({
        name,
        email,
        phone,
        designation
    });

    res.status(200).json(newContact); 
});

// update contact with an ID logic
// route PUT /api/contacts/:id

const updateContactsByID= asyncHandler( async (req,res)=>{
   const contact = await Contact.findById(req.params.id);
   if(!contact){
    res.status(404);
    throw new Error("Contact not found")
   }
   const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true }
    )

   res.status(200).json({
   "message" : `Contact updated successfully`,
   updatedContact
   })

})


// delete contact with an ID logic
// route GET /api/contacts/:id

const deleteContactByID= asyncHandler( async (req,res)=>{
   const contact = await Contact.findById(req.params.id);
   if(!contact){
    res.status(404);
    throw new Error("Contact not found")
   }

   await Contact.deleteOne({_id: req.params.id})
   res.status(200).json({
   "message" : `Contact Deleted Successfully`,
   contact
   })

})




export {  getContacts, deleteContactByID, updateContactsByID, postContact, getContactsByID };