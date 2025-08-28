import express, { Router } from "express";
import userRoute from './userRouter'


const rootRouter = Router();
rootRouter.use('/users',userRoute)

export default rootRouter