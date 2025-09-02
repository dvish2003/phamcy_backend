"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const db_1 = __importDefault(require("../config/db"));
const auth_service_1 = require("../service/auth.service");
const register = async (req, res, next) => {
    const { name, email, password, active, role } = req.body;
    try {
        const isExist = await db_1.default.user.findUnique({
            where: { email: email }
        });
        if (isExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await db_1.default.user.create({
            data: {
                email,
                name,
                password,
                active,
                role
            }
        });
        if (user === null) {
            return res.status(400).json({ message: "User registration failed" });
        }
        return res.status(201).json({ message: "User registered successfully", user });
    }
    catch (_a) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.register = register;
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await (0, auth_service_1.loginUser)(email, password);
        if (typeof result === "string" || result === null) {
            return res.status(400).json({ message: result });
        }
        console.log("result...........", result);
        return res.status(200).json({ message: "Login successful", user: result.user, token: result.token });
    }
    catch (_a) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
