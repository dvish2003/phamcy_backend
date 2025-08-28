import express, { Router } from "express";
import userRoute from './userRouter'


const rootRouter = Router();
rootRouter.use('/user',userRoute)

export default rootRouter