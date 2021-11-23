import { InstanceDB } from "../../global/interface";
import User from "../../model/User";

export class UserQuery {
    private db;

    constructor(db: InstanceDB) {
        this.db = db;
    }

    getAll(): User[] {
        throw new Error("Method not implemented.");
    }
    get(id: number): User {
        throw new Error("Method not implemented.");
    }
    
}