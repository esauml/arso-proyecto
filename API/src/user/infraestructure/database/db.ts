import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import User from '../../domain/User';
import UserCreate from '../../domain/UserCreate';
import UserUpdate from '../../domain/UserUpdate';

export abstract class FirestoreDB {
  private db;
  private firebaseConfig;
  private firebaseApp;
  private myCollection;

  static UserCollection: string = "Users";

  constructor(collectionStr: string) {


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
    this.db = getFirestore();
    this.myCollection = collection(this.db, collectionStr);
  }

  getDB() {
    return this.db;
  }

  getCollection() {
    return this.myCollection;
  }

  getApp() {
    return this.firebaseApp;
  }

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

export class UserFirestore extends FirestoreDB {

  constructor() {
    super(FirestoreDB.UserCollection);
  }

  async getAll() {
    const snapshot = await getDocs(this.getCollection());

    const userList: User[] = snapshot.docs.map(doc => doc.data() as User)

    return userList;
  }

  async get(id: string) {

    const userRef = doc(this.getCollection(), id);

    const snapshot = await getDoc(userRef);

    // if user doesn't exists 
    if (!snapshot.exists) {
      return null;
    }

    const user: User = snapshot.data() as User;

    return user;
  }

  async update(user: UserUpdate): Promise<any> {
    const userRef = doc(this.getCollection(), user.id);

    await updateDoc(userRef, { ...user });

    return true;
  }

  async create(user: UserCreate) {
    const snapshot = await addDoc(this.getCollection(), { ...user });

    // if was not executed
    if (!snapshot.id)
      return null;

    const { id } = snapshot;

    updateDoc(snapshot, { id: id });

    return { id, ...user } as User;
  }

  async delete(id: string) {
    const docRef = doc(this.getCollection(), id);

    const snapshot = deleteDoc(docRef);

    return snapshot;
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
