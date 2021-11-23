import User from "./model/User"
import { UserViewModel } from "./viewModel/UserViewModel";

// 
let user1 = new User();
user1.init({ name: 'esau', username: 'esauml', birthday: '22-03-2000', email: 'esaumtz4722' });
// 
let user2 = new User();
user2.init({ name: 'salvador', username: 'salvadorml', birthday: '22-03-2000', email: 'salvador2247' });

// Instance of ViewModel
const vm = new UserViewModel();

// command create sent to ViewModel

vm.createUser(user1);
vm.createUser(user2);

// commands update sent to ViewModel
let findIndex = vm.data.findIndex(search => search.id === user1.id);
if (findIndex !== -1) {
    let find = vm.data[findIndex];

    find.name = 'lorem';
    find.username = 'ipsum';

    vm.updateUser(find);
}
