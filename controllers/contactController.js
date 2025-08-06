// get all contacts logic
// route GET /api/contacts


import express from 'express';

const getContacts =(req,res)=>{
    res.status(200).json({
        message: "List of contacts will be displayed here",
        
    }); 
}


// get contact with an ID logic
// route GET /api/contacts/:id

const getContactsByID=(req,res)=>{
    res.status(200).json({
        message: "Get Contact By Id",
        
    }); 
}

// post contact logic
// route POST /api/contacts/

const postContact=(req,res)=>{
    res.status(200).json({
        message: "Post a Contact",
        
    }); 
}

// update contact with an ID logic
// route PUT /api/contacts/:id

const updateContactsByID=(req,res)=>{
    res.status(200).json({
        message: "update Contact By Id",
        
    }); 
}


// delete contact with an ID logic
// route GET /api/contacts/:id

const deleteContactByID=(req,res)=>{
    res.status(200).json({
        message: "Delete By Id",
        
    }); 
}



export {  getContacts, deleteContactByID, updateContactsByID, postContact, getContactsByID };