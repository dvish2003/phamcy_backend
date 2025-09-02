"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getAllUsers = exports.loginUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const auth_1 = require("../util/auth");
const loginUser = async (email, password) => {
    const user = await db_1.default.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return ("User not found");
    }
    if (user.password !== password) {
        return ("Invalid password");
    }
    const token = (0, auth_1.generateToken)(user.email);
    return {
        user: user,
        token: token
    };
};
exports.loginUser = loginUser;


const getAllUsers = async () => {
    return await db_1.default.user.findMany();
};
exports.getAllUsers = getAllUsers;
const getUserByEmail = async (email) => {
    const user = await db_1.default.user.findUnique({
        where: { email }
    });
    if (!user) {
        return false;
    }
    return true;
};
exports.getUserByEmail = getUserByEmail;
