import { doc } from "@firebase/firestore";
import { UserController } from "../controller/UserController";
import { Observable } from "../global/interface";
import { Model, ViewModel } from "../global/mvvm";
import User from "../model/User";


export class UserViewModel extends ViewModel {

    private model: UserController;
    data: User[] = [];

    // view components
    apply = <HTMLButtonElement>document.getElementById('apply');
    table = <HTMLTableElement>document.getElementById('user-table-head');
    form = <HTMLFormElement>document.getElementById('user-form');

    constructor() {
        super();

        this.init();
    }

    update(provider: Observable): void {
        console.log('Subscriber: there has been an update');
        this.bind(provider)
    }

    bind(provider: Observable) {
        const data = (provider as UserController).getAll();

        this.data = data;

        console.log(data);

        // clean table
        // this.table.innerHTML = '';

        // data.forEach(element => {
        //     const tr = document.createElement('tr');
            
        //     // creating row & cells
        //     const tdName = tr.insertCell();
        //     const tdUsername = tr.insertCell();
        //     const tdBirthday = tr.insertCell();
        //     const tdEmail = tr.insertCell();

        //     // fill cells with data
        //     tr.dataset.idUser = `${element.id}`; // reference id in dataset of row
        //     tdName.appendChild(document.createTextNode(`${element.name}`));
        //     tdUsername.appendChild(document.createTextNode(`${element.username}`));
        //     tdBirthday.appendChild(document.createTextNode(`${element.birthday}`));
        //     tdEmail.appendChild(document.createTextNode(`${element.email}`));

        //     this.table.appendChild(tr);
        // });
    }
    
    init() {
        // set gateway of app
        const controller = new UserController();
        controller.attach(this);

        //stores model for functionality
        this.model = controller;

        // set listeners
        // this.setListeners();
    }

    // setListeners() {
    //     //listener for form
    //     this.form.addEventListener('submit', e => {
    //         e.preventDefault(); // no page reload

    //         const todo = this.apply.dataset.todo;

    //         const idElement = (document.getElementById('id') as HTMLInputElement).value;
    //         const name = (document.getElementById('name') as HTMLInputElement).value;
    //         const username = (document.getElementById('username') as HTMLInputElement).value;
    //         const birthday = (document.getElementById('birthday') as HTMLInputElement).value;
    //         const email = (document.getElementById('email') as HTMLInputElement).value;

    //         const id = parseInt(idElement);
    //         let user = new User();
    //         user.init({id , name, username, birthday, email});
    //         // user.setId(id);
    //         // user.setName(name);
    //         // user.setUsername(username);
    //         // user.setBirthday(birthday);
    //         // user.setEmail(em);
    //         console.log(user);

    //         // if create or update 
    //         if (todo === 'create') this.model.create(user); // command for create
    //         if (todo === 'update') this.model.update(user); // command for update
    //     })
    // }

    createUser(user: User): void {
        console.log('Subscriber: I will create', user);
        this.model.create(user);
    }

    updateUser(user: User): void {
        console.log('Subscriber: I will update', user);
        this.model.update(user);
    }
}

