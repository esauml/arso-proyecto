import User from '../../../model/User';

export interface ICRUD<Type> {
    getAll(): Type[];
    get(id: number): Type;
    update(type: Type): Type;
    create(type: Type): Type;
}

export interface IUserCRUD extends ICRUD<User> {
    // nothing
}