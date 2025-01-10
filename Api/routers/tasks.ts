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
        next(error);
    }
});

tasksRouter.delete('/:id',auth, async (req, res, next) => {
    try{
        let expressReq = req as RequestWithUser
        const user = expressReq.user;
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).send({error: 'Not found'});

        }
        else if(task.user.toString() !== user._id.toString()) {
            res.status(403).send({error:"You are trying to delete someone else's task"});

        }
        else{
            await Task.deleteOne({_id: req.params.id});
            res.send({message: "Task deleted successfully."});
        }

    }catch(error){
        next(error);
    }
})
export default tasksRouter;