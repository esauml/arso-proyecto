import User from "../../../domain/User";
import UserCreate from "../../../domain/UserCreate";
import UserUpdate from "../../../domain/UserUpdate";
import { InstanceDB } from "../../global/interface";
import { UserFirestore } from "../db";

export class UserCommands {
    private db: InstanceDB;

    constructor(db: InstanceDB) {
        this.db = db;
    }

    create(user: UserCreate) {
        const firestore = this.db as UserFirestore;

        const isValidUser: boolean = this.isValidUser(user);

        if (!isValidUser) return null;

        return firestore.create(user);
    }

    update(user: UserUpdate) {
        const firestore = this.db as UserFirestore;

        return firestore.update(user);
    }

    delete(id: string) {
        const firestore = this.db as UserFirestore;

        return firestore.delete(id);
    }

    isValidUser(user: UserCreate) {
        if (!this.isAdult(user.birthday)) return false;
        if (!this.isValidEmail(user.email)) return false;
        if (!this.isValidName(user.name)) return false;

        return true;
    }

    isAdult(birthday: string) {
        let dateBirth: Date = new Date(birthday);
        let today: Date = new Date();

        let years = new Date(today.getTime() - dateBirth.getTime()).getFullYear() - 1970;

        if (years >= 18) return true;
        return false;
    }

    isValidEmail(email: string) {
        if (this.isValidLength(email)) return true;
        return false;
    }

    isValidName(name: string) {
        if (this.isValidLength(name)) return true;
        return false;
    }

    isValidLength(string: string) {
        if (string.length > 100) return false;
        return true;
    }
}