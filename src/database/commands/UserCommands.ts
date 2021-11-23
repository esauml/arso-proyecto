import { InstanceDB } from "../../global/interface";
import User from "../../model/User";

export class UserCommands {
    private db: InstanceDB;

    constructor(db: InstanceDB) {
        this.db = db;
    }

    create(user: User): User {
        throw new Error('Method not implemented.');
    }
    update(user: User): User {
        throw new Error('Method not implemented.');
    }
}