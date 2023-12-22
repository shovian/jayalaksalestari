import { useRef } from "react";
import { app } from "../../../../(context)/FirebaseContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(app);
export class User {
  id?: String;
  username?: String;
  password?: String;
  role?: String;
  saldo?: String;
  public login(username: String, password: String) {
    //login logic here
  }

  public static getCurrentUserRole() {
    return localStorage.getItem("role");
  }
  public static getCurrentUserId() {
    return localStorage.getItem("id");
  }
  public static setCurrentUserRole(role: String) {
    localStorage.setItem("role", role as string);
  }
  public static setCurrentUserId(id: String) {
    localStorage.setItem("id", id as string);
  }
  public static deleteCurrentUserRole() {
    localStorage.removeItem("role");
  }
  public static deleteCurrentUserId() {
    localStorage.removeItem("id");
  }
  public static async getNamaById(id: String) {
    const nama: any = [];
    await this.getUserById(id).then((user) => {
      nama.push(user.username);
    });
    return nama[0];
  }
  public static async getUsersByRole(role: String) {
    const userRef = collection(db, "users");
    const userRes = await getDocs(
      query(userRef, where("role", "==", role as string))
    );
    const users: User[] = [];
    userRes.forEach((doc) => {
      const newUser = new User();
      const fetchedData = doc.data() as unknown as User;
      newUser["id"] = doc.id;
      newUser["username"] = fetchedData.username;
      newUser["password"] = fetchedData.password;
      newUser["role"] = fetchedData.role;
      users.push(newUser);
    });
    return users;
  }
  public static async getUserById(id: String) {
    const newUser = new User();
    const userRef = doc(db, "users", id as string);
    const userRes = await getDoc(userRef);
    const fetchedData = userRes.data() as unknown as User;
    newUser["id"] = userRes.id;
    newUser["username"] = fetchedData.username;
    newUser["password"] = fetchedData.password;
    newUser["role"] = fetchedData.role;
    return newUser;
  }
}
