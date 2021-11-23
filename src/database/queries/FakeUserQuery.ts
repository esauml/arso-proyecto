import User from "../../model/User";

export class FakeUserQuery {
    private db;

    constructor(db: User[]) {
        this.db = db;
    }

    getAll(): User[] {
        return this.db;
    }
    get(id: number): User {
        return this.db.find(user => { return user.id === id });
    }
    
}