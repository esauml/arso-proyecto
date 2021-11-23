import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import User from '../model/User';

export abstract class FirestoreDB<Type>{
  private db;
  private firebaseConfig;
  private firebaseApp;
  private collection: string;

  static UserCollection: string = "Users";

  constructor(collection: string) {

    this.collection = collection;

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    this.firebaseConfig = {
      apiKey: "AIzaSyDPcUNV9azzKWd5cl3V8gVLOK5gZF4H51U",
      authDomain: "arso-p3-proyecto.firebaseapp.com",
      projectId: "arso-p3-proyecto",
      storageBucket: "arso-p3-proyecto.appspot.com",
      messagingSenderId: "274996623105",
      appId: "1:274996623105:web:3c2596f27bf0ce59ae8d00",
      measurementId: "G-FMTJX2B1Y2"
    };

    // Initialize Firebase
    this.firebaseApp = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.firebaseApp);
  }

  getDB() {
    return this.db;
  }

  getCollection() {
    return this.collection;
  }

  abstract getAll(): Type[];

  abstract get(id: number): Type;
  
  abstract update(type: Type): Type;

  abstract create(type: Type): Type;

  // abstract create(type: Type): Type {
  //   addDoc(collection(this.db, this.collection), { ...User })
  //     .then(result => {
  //       let objRes = new Type();
  //     })
  //     .catch(e => {
  //       return null;
  //     })
  // }
}

export class UserFirestore extends FirestoreDB<User> {

  constructor() {
    super(FirestoreDB.UserCollection);
  }

  getAll(): User[] {
    throw new Error('Method not implemented.');
  }
  get(id: number): User {
    throw new Error('Method not implemented.');
  }
  update(type: User): User {
    throw new Error('Method not implemented.');
  }
  create(type: User): User {
    throw new Error('Method not implemented.');
  }
  
}


// addDoc(collection(db, "users"), {
//   first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
//   .then((result: any) => {
//     console.log(result);
//     return result;
//   })
//   .catch((e: any) => {
//     console.log('error', e)
//   })
