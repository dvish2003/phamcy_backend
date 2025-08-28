
import { NextFunction, Request, response, Response } from "express";
import { User } from "../model/UserOB";
import { getUserByEmail, registerUser } from "../service/auth.service";
import prisma from "../config/db";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, active, role } = req.body as User;

    try {

        const isExist = await prisma.user.findUnique({
            where: { email: email }
        });

        if (isExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password,
                active,
                role
            }
        })


        if (user === null) {
            return res.status(400).json({ message: "User registration failed" });
        }
        return res.status(201).json({ message: "User registered successfully", user });

    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }


}