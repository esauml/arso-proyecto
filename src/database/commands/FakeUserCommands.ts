
import User from "../../model/User";

export class FakeUserCommands {
    private db: User[];

    constructor(db: User[]) {
        this.db = db;
    }

    create(user: User): User {
        const index = this.db.length;
        user.id = index;
        
        this.db[index] = user;

        return this.db[index];
    }
    update(user: User): User {
        const index = this.db.findIndex(search => search.id === user.id);

        this.db[index] = user;
        return this.db[index];
    }
}