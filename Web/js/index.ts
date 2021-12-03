import User from "../model/User";
import axios from 'axios';

export class UserViewModel {

    users: User[] = [];

    // view components
    private table: HTMLTableElement;
    private form: HTMLFormElement;

    private inputId: HTMLInputElement;
    private inputName: HTMLInputElement;
    private inputUsername: HTMLInputElement;
    private inputBirthday: HTMLInputElement;
    private inputEmail: HTMLInputElement;
    private btnApply: HTMLButtonElement;

    constructor() {
        this.initComponents();

        this.setListeners();

        this.notifyModelChange(); // fills model
        this.fillTable(this.getUsers); // fills 
    }

    initComponents() {

        this.btnApply = <HTMLButtonElement>document.getElementById('apply');
        this.table = <HTMLTableElement>document.getElementById('user-table-body');
        this.form = <HTMLFormElement>document.getElementById('user-form');

        this.inputId = <HTMLInputElement>document.getElementById('id');
        this.inputName = <HTMLInputElement>document.getElementById('name');
        this.inputUsername = <HTMLInputElement>document.getElementById('username');
        this.inputBirthday = <HTMLInputElement>document.getElementById('birthday');
        this.inputEmail = <HTMLInputElement>document.getElementById('email');
    }

    setListeners() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            const { todo } = this.btnApply.dataset

            const id = this.inputId.value;
            const name = this.inputName.value;
            const username = this.inputUsername.value;
            const birthday = this.inputBirthday.value.replace('-', '/').replace('-', '/');
            const email = this.inputEmail.value;

            // if create or update 
            if (todo === 'create') this.createUser({ name, username, birthday, email } as User);
            if (todo === 'update') this.updateUser({ id, name, username, birthday, email } as User)

            this.form.reset(); // resets form 
        });

        // reset apply button on reset
        this.form.addEventListener('reset', e => {
            this.btnApply.dataset.todo = 'create';
        });
    }

    notifyModelChange() {
        this.getUsers().then(response => {
            this.users = response.data as User[];
        }).catch(e => {
            console.log(`Error: couldn't notify model change`, e);
        });
    }

    fillTable(cbGetUser: CallableFunction) {
        cbGetUser().then((response: any) => {

            console.log(response.data as User[]);

            this.renderTable(response.data as User[])
        });
    }

    renderTable(data: User[]) {
        // data retrieve

        // clean table
        this.table.innerHTML = '';

        data.forEach(async (element) => {
            const tr = document.createElement('tr');

            // creating row & cells
            const tdId = tr.insertCell();
            const tdName = tr.insertCell();
            const tdUsername = tr.insertCell();
            const tdBirthday = tr.insertCell();
            const tdEmail = tr.insertCell();
            const tdActions = tr.insertCell();
            const btnEdit = document.createElement('button');
            const btnDelete = document.createElement('button');

            // fill cells with data
            tdId.appendChild(document.createTextNode(`${element.id}`));
            tdName.appendChild(document.createTextNode(`${element.name}`));
            tdUsername.appendChild(document.createTextNode(`${element.username}`));
            tdBirthday.appendChild(document.createTextNode(`${element.birthday}`));
            tdEmail.appendChild(document.createTextNode(`${element.email}`));
            tdActions.appendChild(btnEdit);
            tdActions.appendChild(btnDelete);

            btnEdit.innerText = "Edit";
            btnDelete.innerText = "Delete";

            // btn listers
            btnDelete.addEventListener('click', e => this.deleteAccess(e, element.id));
            btnEdit.addEventListener('click', e => this.editAccess(e, element.id));

            this.table.appendChild(tr);
        });
    }

    deleteAccess(event: Event, id: string) {
        console.log(event)

        const ok = window.confirm('Seguro de eliminar');

        if (ok) this.deleteUser({ id });
    }

    editAccess(event: Event, id: string) {
        const user = this.users.find(e => e.id === id);

        this.btnApply.dataset.todo = 'update';


        this.inputId.value = user.id;
        this.inputName.value = user.name;
        this.inputUsername.value = user.username;

        const fixBirthday = user.birthday.replace('/', '-').replace('/', '-');
        this.inputBirthday.value = fixBirthday;
        this.inputEmail.value = user.email;
    }

    // FROM NOW ACCESS TO API

    async createUser(user: User) {
        console.log('Subscriber: I will create', user);

        await axios.post(' http://localhost:8081/api/users', { ...user }).then(result => {
            this.notifyModelChange();

            this.fillTable(this.getUsers);
        })
    }

    async updateUser(user: User) {
        console.log('Subscriber: I will update', user);


        await axios.put(' http://localhost:8081/api/users', { ...user }).then(result => {
            this.notifyModelChange();

            this.fillTable(this.getUsers);
        })

        this.notifyModelChange();
    }

    async deleteUser(user: User) {
        console.log('Subscriber: I will delete', user);

        await axios.delete(' http://localhost:8081/api/users/' + user.id).then(result => {
            this.notifyModelChange();

            this.fillTable(this.getUsers);
        })

        this.notifyModelChange();
    }

    async getUsers() {
        console.log('Subscriber: I will get all');
        const response = await axios.get(' http://localhost:8081/api/users/');

        return response;
    }

    async getUser(user: User) {
        console.log('Subscriber: I will get user', user);

        const response = await axios.get(' http://localhost:8081/api/users/' + user.id);

        return response;
    }

    async getUsersPublic() {
        console.log('Subscriber: I will get users public');

        const response = await axios.get(' http://localhost:8081/api/users/public');

        return response;
    }

    async getUserPublic(user: User) {
        console.log('Subscriber: I will get users public', user);

        const response = await axios.get(' http://localhost:8081/api/users/public' + user.id);

        return response;
    }

}

const vc = new UserViewModel();

