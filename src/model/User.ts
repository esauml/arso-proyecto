import { IUser } from "../global/interface";

export default class User {
    id?: number;
    name: string;
    username: string;
    birthday: string;
    email: string;
    
    init(props: IUser) {
        if(props.id)  this.id = props.id;
        this.name = props.name;
        this.username = props.username;
        this.birthday = props.birthday;
        this.email = props.email;
    }

}