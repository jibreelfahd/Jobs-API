import JobModel from "../models/job.js";
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from "../errors/index.js";

export const getAllJobs = async (req, res) => {
    const { userId } = req.user;
    const jobs = await JobModel.find({ createdBy: userId }).sort('createdAt');
    
    if (jobs.length === 0) {
        throw new NotFoundError('No jobs found');
    }

    res.status(StatusCodes.OK).json({ jobs, nbHits: jobs.length });
}

export const getJob = async (req, res) => {
    const { userId } = req.user;
    const { jobId } = req.params;
    const job = await JobModel.findOne({ _id: jobId, createdBy: userId });
    
    if (!job) {
        throw new NotFoundError('Job not available');
    }

    res.status(StatusCodes.OK).json({ job });
}

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await JobModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

export const updateJob = async (req, res) => {
    const { userId } = req.user;
    const { jobId } = req.params;
    const job = await JobModel.findOneAndUpdate({ _id: jobId, createdBy: userId}, req.body, {
        runValidators: true,
        new: true
    });

    if (!job) {
        throw new NotFoundError('Job not available');
    }
    
    res.status(StatusCodes.OK).json({ job });
}

export const deleteJob = async (req, res) => {
    const { userId } = req.user;
    const { jobId } = req.params;
    const job = await JobModel.findOneAndDelete({ _id: jobId, createdBy: userId});

    if (!job) {
        throw new NotFoundError('Job not available');
    }
    
    res.status(StatusCodes.OK).json({ success: 'Job deleted successfully' });
}