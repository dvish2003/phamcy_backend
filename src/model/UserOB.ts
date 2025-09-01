import { UUID } from "crypto";

export type User = {
    id?: UUID;
    name: string;
    email: string;
    password: string;
    active: boolean;
    role: string;
}