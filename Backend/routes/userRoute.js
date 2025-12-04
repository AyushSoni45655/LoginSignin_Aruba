import express from 'express';
const UserRoute = express.Router();
import {signIn,signUp} from '../controllars/user.controllers.js'

UserRoute.post("/signin",signIn);
UserRoute.post("/signup",signUp);
export default UserRoute;