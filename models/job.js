import mongoose from 'mongoose';
import UserModel from './user.js';

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide a valid position'],
        maxlength: 20
    },
    status: {
        type: String,
        required: [true, 'Please provide a status'],
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'UserModel',
        required: [true, 'Please provide a user']
    }
}, { timestamps: true });

const JobModel = mongoose.model('jobs', jobSchema);
export default JobModel;