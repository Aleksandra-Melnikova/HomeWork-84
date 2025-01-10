import auth, {RequestWithUser} from "../middlewear/auth";
import express from "express";
import Task from "../models/Task";
import mongoose from "mongoose";

const tasksRouter = express.Router();
tasksRouter.post('/', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser
    const user = expressReq.user;
    const newTask= {
        user: user._id,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    };

    try {
        const task = new Task(newTask);
        await task.save();
        res.send(task);
    }

    catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
        const ValidationErrors = Object.keys(error.errors).map(key =>({
            field: key,
            message: error.errors[key].message,
        }));
        res.status(400).send({errors: ValidationErrors});
    }
        next(error);
    }
});

tasksRouter.get('/',auth, async (req, res, next) => {
    try {
        let expressReq = req as RequestWithUser
        const user = expressReq.user;
        const tasks = await Task.find({user:user._id});
        res.send(tasks);
    }     catch (error) {
        // if(error instanceof mongoose.Error.ValidationError){
        //     const ValidationErrors = Object.keys(error.errors).map(key =>({
        //         field: key,
        //         message: error.errors[key].message,
        //     }));
        //     res.status(400).send({errors: ValidationErrors});
        // }
        next(error);
    }
});
tasksRouter.delete
export default tasksRouter;