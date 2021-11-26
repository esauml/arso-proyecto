import { Model } from "../global/interface";
import User from "../model/User";
import UserAppService from "../service/UserAppService";

export class UserController extends Model{

    private service: UserAppService;

    constructor() {
        super();

        this.service = new UserAppService();
    }

    /**
     * 
     * @returns array of <User>
     *  should get empty(null) or full array of users
     */
    getAll(): User[] {
        return this.service.getAll();
    }

    /**
     * It Should return searched User or null
     * 
     * @param id 
     * @returns <User>
     */
    get(id: number): User {
        return this.service.get(id);
    }

    /**
     * It will notify subscriber(ViewModel) of change
     * 
     * @param user 
     */
    update(user: User): void {
        const updated = this.service.update(user);

        if (updated) {
            this.notify();
        }
    }

    /**
     * It will notify subscriber(ViewModel) of change
     * 
     * @param user 
     */
    create(user: User): void {
        const created = this.service.create(user);

        if (created) {
            this.notify();  
        }
    }
    

}