import express, { Request, Response } from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
// ROUTER IMPORT
import { UserRouter } from './user/UserRouter';


// string literals
const API = "/api";
const USER_ROUTE = API + "/users";

// bring into environment specification of .env file
dotenv.config();

const app = express(); // init express 
const port = process.env.PORT; // brings port from .env file

app.use(cors());

// enables us to transform body types from our request object 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTERS
app.use(USER_ROUTE, UserRouter); // user router
// END ROUTERS

app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});