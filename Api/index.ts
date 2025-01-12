import express from "express";
import usersRouter from './routers/users';
import config from "./config";
import cors from "cors";
import * as mongoose from "mongoose";
import tasksRouter from "./routers/tasks";



const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));


