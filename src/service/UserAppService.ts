import { IUserCRUD } from "../global/interface/crud";
import User from "../model/User";
import { FakeUserQuery } from "../database/queries/FakeUserQuery";
import { FakeUserCommands } from "../database/commands/FakeUserCommands";
import { InstanceDB } from "../global/interface";

export default class UserAppService implements IUserCRUD {
    // private db: InstanceDB;
    private db: User[] = [];

    constructor(/* could get by factory db instance*/) {
        // this.db = new UserFirestore(); // brings instance of DB from import
        this.db = [];
    }

    getAll(): User[] {
        // instance of queries of dao
        const dao = new FakeUserQuery(this.db);
        return dao.getAll();
    }

    get(id: number): User {
        // instance of queries of dao
        const dao = new FakeUserQuery(this.db);
        return dao.get(id);
    }
    update(user: User): User {
        const dao = new FakeUserCommands(this.db);

        return dao.update(user);
    }
    create(user: User): User {
        const dao = new FakeUserCommands(this.db);

        return dao.create(user);
    }

}