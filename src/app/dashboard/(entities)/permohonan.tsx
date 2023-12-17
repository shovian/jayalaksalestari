import { app } from "@/app/(context)/FirebaseContext";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
const db = getFirestore(app);
export class Permohonan {
  id?: String;
  idUser?: String;
  linkDoc?: String;
  pengajuanDate?: Timestamp | Date;
  status?: String;
  totalDana?: String;
  private static makeObject(id: String, fetchedData: Permohonan) {
    const permohonan = new Permohonan();
    permohonan["id"] = id;
    permohonan["idUser"] = fetchedData.idUser;
    permohonan["linkDoc"] = fetchedData.linkDoc;
    permohonan["pengajuanDate"] = (
      fetchedData.pengajuanDate as Timestamp
    ).toDate();
    permohonan["status"] = fetchedData.status;
    permohonan["totalDana"] = fetchedData.totalDana;

    return permohonan;
  }
  public async setStatus(status: String) {
    const permRef = doc(db, "permohonan", this.id as string);
    await setDoc(permRef, { status: status }, { merge: true });
  }
  public async setLinkDoc(linkDoc: String) {
    const permRef = doc(db, "permohonan", this.id as string);
    await setDoc(permRef, { linkDoc: linkDoc }, { merge: true });
  }
  public static async getPermohonanById(id: String) {
    const permRef = doc(db, "permohonan", id as string);
    const permRes = await getDoc(permRef);
    const fetchedData = permRes.data() as unknown as Permohonan;
    return this.makeObject(id, fetchedData);
  }
  public static subscribeDatabase(callback: (data: Permohonan[]) => void) {
    onSnapshot(collection(db, "permohonan"), (doc) => {
      const listPermohonan: Permohonan[] = [];
      doc.forEach((data) => {
        const fetchedData = data.data() as unknown as Permohonan;
        const permohonan = this.makeObject(data.id, fetchedData);
        listPermohonan.push(permohonan);
      });
      callback(listPermohonan);
    });
  }
}
