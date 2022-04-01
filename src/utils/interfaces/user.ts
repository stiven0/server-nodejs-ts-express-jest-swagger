import { Schema, Document } from 'mongoose';

export interface User extends Document {
    _id:        Schema.Types.ObjectId;
    name:       string;
    email:      string;
    role:       string;
    createdAt:  Date | number;
    updatedAt:  Date | number;
}