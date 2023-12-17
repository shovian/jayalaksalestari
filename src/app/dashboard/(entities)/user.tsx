import { app } from "@/app/context/FirebaseContext";
import { doc, getDoc, getFirestore, query } from "firebase/firestore";

const db = getFirestore(app);
export class User {
  id?: String;
  username?: String;
  password?: String;
  role?: String;
  public login(username: String, password: String) {
    //login logic here
  }
  public static getCurrentUserRole() {
    return localStorage.getItem("role");
  }
  public static setCurrentUserRole(role: String) {
    localStorage.setItem("role", role as string);
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
