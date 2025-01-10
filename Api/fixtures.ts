import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import { randomUUID } from "crypto";
import Task from "./models/Task";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('tasks');
    } catch (e) {
        console.log("Collections were not presents, skipping drop");
    }

    const [userJane, userJohn] = await User.create({
            username: 'Jane',
            password: "123",
            token: randomUUID(),
        },
        {
            username: 'John',
            password: "1239",
            token: randomUUID(),
        });

await Task.create({
        user: userJane._id,
        title: 'walk the dog',
    status: 'in_progress'
    },
        {
            user: userJohn._id,
            title: 'wash the dishes',
            description: 'wash plates, spoons and cups after dinner',
            status:'complete'
        }
    );
    await db.close();
    
}

run().catch(console.error);