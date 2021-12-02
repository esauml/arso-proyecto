import UserPublic from "../../../domain/UserPublic";
import { InstanceDB, IUser } from "../../global/interface";
import { UserFirestore } from "../db";

export class UserQuery {
    private db;

    constructor(db: InstanceDB) {
        this.db = db;
    }

    async getAll() {
        const firestore = this.db as UserFirestore;

        return await firestore.getAll();
    }

    async getAllPublic() {
        const firestore = this.db as UserFirestore;

        const list = (await firestore.getAll()).map(element => {
            const { id, username } = element;
            return { id, username } as UserPublic;
        });

        return list;
    }

    async get(id: string) {
        const firestore = this.db as UserFirestore;
        const user = await firestore.get(id);

        if (user === null || user === undefined) return null;

        return user;
    }

    async getPublic(idSearch: string) {
        const firestore = this.db as UserFirestore;
        const user = await firestore.get(idSearch);

        if (user === null || user === undefined) return null;

        const { id, username } = user;
        return { id, username } as UserPublic;
    }

}