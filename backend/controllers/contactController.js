import Contact from '../models/contactModel.js';
import asyncHandler from "express-async-handler";
import express from 'express';
import jwt from 'jsonwebtoken';

// ============================
// Auth Middleware
// ============================
const authMiddleware = asyncHandler((req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(401);
        throw new Error("Unauthorized: No token provided");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // user info from token
        next();
    } catch (err) {
        res.status(401);
        throw new Error("Unauthorized: Invalid token");
    }
});

// ============================
// GET all contacts for logged-in user
// Route: GET /api/contacts
// ============================
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user: req.user.id }); // filter by user
    res.status(200).json({ contacts });
});

// ============================
// GET contact by ID (user-specific)
// Route: GET /api/contacts/:id
// ============================
const getContactsByID = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ contact });
});

// ============================
// POST a new contact (associate with user)
// Route: POST /api/contacts
// ============================
const postContact = asyncHandler(async (req, res) => {
    const { name, email, phone, designation } = req.body;
    if (!name || !email || !phone || !designation) {
        res.status(400);
        throw new Error("Please provide all required fields: name, email, phone, designation");
    }

    const newContact = await Contact.create({
        name,
        email,
        phone,
        designation,
        user: req.user.id // associate contact with logged-in user
    });

    res.status(201).json(newContact);
});

// ============================
// UPDATE contact (user-specific)
// Route: PUT /api/contacts/:id
// ============================
const updateContactsByID = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json({
        message: "Contact updated successfully",
        updatedContact
    });
});

// ============================
// DELETE contact (user-specific)
// Route: DELETE /api/contacts/:id
// ============================
const deleteContactByID = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({
        message: "Contact deleted successfully",
        contact
    });
});

export {
    authMiddleware, // export to protect routes
    getContacts,
    getContactsByID,
    postContact,
    updateContactsByID,
    deleteContactByID
};
