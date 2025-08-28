import prisma from "../config/db";
import { User } from "../model/UserOB";
import { generateToken } from "../util/auth";

export const registerUser = async(email:string, name:string, password:string)=>{
  try{
      const user = await prisma.user.create({
         data: {
             email,
             name,
             password
         }
    })
    return user;
  }
  catch(error){
    console.error("Error registering user:", error);
    throw new Error("Error registering user");
  }
}


export const loginUser = async(email:string, password:string) =>{
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(!user) {
        return("User not found");
    }
    if(user.password !== password){
        return("Invalid password");
    }

    const token = generateToken(user.email);
    return { user, token };
}


export const getAllUsers = async () => {
    return await prisma.user.findMany();
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if(user === null) {
    return true;
    }
    if(user !== null) return false;
}
