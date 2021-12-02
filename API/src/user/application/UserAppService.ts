import { InstanceDB, IUser } from "../infraestructure/global/interface";
import { UserFirestore } from "../infraestructure/database/db";
import { UserQuery } from "../infraestructure/database/queries/UserQuery";
import { UserCommands } from "../infraestructure/database/commands/UserCommands";
import UserUpdate from "../domain/UserUpdate";
import UserCreate from "../domain/UserCreate";

export default class UserAppService {
    private db: InstanceDB;
    // private db: User[] = [];

    constructor(/* could get by factory db instance*/) {
        this.db = new UserFirestore(); // brings instance of DB from import

    }

    getAll() {
        const dao = new UserQuery(this.db);
        return dao.getAll();
    }

    getAllPublic() {
        const dao = new UserQuery(this.db);
        return dao.getAllPublic();
    }

    get(id: string) {
        const dao = new UserQuery(this.db);
        return dao.get(id);
    }

    getPublic(id: string) {
        const dao = new UserQuery(this.db);
        return dao.getPublic(id);
    }

    update(user: UserUpdate) {
        const dao = new UserCommands(this.db);

        return dao.update(user);
    }

    create(user: UserCreate) {
        const dao = new UserCommands(this.db);

        return dao.create(user);
    }

    delete(id: string) {
        const dao = new UserCommands(this.db);

        return dao.delete(id);
    }
}