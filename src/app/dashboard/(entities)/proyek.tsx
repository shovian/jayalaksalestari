import { app } from "../../../../(context)/FirebaseContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { Barang } from "./barang";
import { Inventori } from "./inventori";

const db = getFirestore(app);
export type TProyek = {
  id?: String;
  namaProyek?: String;
  budgetProyek?: String;
  cp?: String;
};
export class Proyek implements TProyek {
  id?: String;
  namaProyek?: String;
  budgetProyek?: String;
  cp?: String;
  public async createProyek(proyek: TProyek) {
    const invRef = collection(db, "proyek");
    const invRes = await addDoc(invRef, { ...proyek });
    return invRes;
  }
  public async getBarangsById(id: String) {
    return (await Inventori.getAllBarangs()).filter((barang) => {
      return barang.idProyek === id;
    });
  }
  public async subscribeDatabase(callback: (proyeks: Proyek[]) => void) {
    onSnapshot(collection(db, "proyek"), (doc) => {
      const proyeks: Proyek[] = [];
      doc.forEach((doc) => {
        const proyek = new Proyek();
        const fetchedData = doc.data() as unknown as Proyek;
        proyek["id"] = doc.id;
        proyek["namaProyek"] = fetchedData.namaProyek;
        proyek["budgetProyek"] = fetchedData.budgetProyek;
        proyek["cp"] = fetchedData.cp;
        proyeks.push(proyek);
      });
      callback(proyeks);
    });
  }
  public static async getNamaProyekById(id?: String) {
    const namaProyek = id ? (await Proyek.getProyekById(id)).namaProyek : "";
    return namaProyek;
  }
  public static async getProyekById(id: String) {
    const proyekRef = doc(db, "proyek", id as string);
    const proyekRes = await getDoc(proyekRef);
    const fetchedData = proyekRes.data() as Proyek;
    const proyek: Proyek = new Proyek();

    proyek["id"] = proyekRes.id;
    proyek["budgetProyek"] = fetchedData.budgetProyek;
    proyek["namaProyek"] = fetchedData.namaProyek;
    proyek["cp"] = fetchedData.cp;

    return proyek;
  }
  public static async updateProyekById(id: String, proyek: Proyek) {
    const proyekRef = doc(db, "proyek", id as string);
    const proyekRes = await setDoc(proyekRef, { ...proyek }, { merge: true });
  }
  public static async deleteProyekById(id: String) {
    const proyekRef = doc(db, "proyek", id as string);
    const proyekRes = await deleteDoc(proyekRef);
  }
  public static async createProyek(data: Proyek) {
    const proyekRef = collection(db, "proyek");
    const proyekRes = await addDoc(proyekRef, { ...data });
    return { ...data, id: proyekRes.id as String };
  }
  public static async getAllProyek() {
    const refProyek = collection(db, "proyek");
    const resProyek = await getDocs(refProyek);
    const proyeks: Proyek[] = [];
    resProyek.forEach((doc) => {
      const proyek = new Proyek();
      const fetchedData = doc.data() as unknown as Proyek;
      proyek["id"] = doc.id;
      proyek["namaProyek"] = fetchedData.namaProyek;
      proyek["budgetProyek"] = fetchedData.budgetProyek;
      proyek["cp"] = fetchedData.cp;
      proyeks.push(proyek);
    });
    return proyeks;
  }
}
