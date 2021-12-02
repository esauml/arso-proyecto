import { IUser } from "../infraestructure/global/interface";

export default interface User {
    id: string;
    name: string;
    username: string;
    birthday: string;
    email: string;
}