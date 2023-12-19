import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "../../../../(context)/FirebaseContext";
import { User } from "./user";
const db = getFirestore(app);
export class Absensi {
  id?: String;
  idKaryawan?: String;
  status?: String;
  date?: Date | Timestamp;
  public static subscribeStatus(
    idKaryawan: String,
    callback: (data: any) => void
  ) {
    const absRef = collection(db, "absensi");
    onSnapshot(absRef, (docs) => {
      docs.forEach((doc) => {
        const fetchedData = doc.data() as Absensi;
        if (fetchedData.idKaryawan == idKaryawan) {
          callback(fetchedData.status === "hadir");
        }
      });
    });
  }
  public static subscribeDatabase(callback: (data: any) => void) {
    const absRef = collection(db, "absensi");
    const data: any[] = [];
    onSnapshot(absRef, (docs) => {
      docs.forEach((doc) => {
        const fetchedData = doc.data() as Absensi;
        fetchedData["id"] = doc.id;
        data.push(fetchedData);
      });
      callback(data);
    });
  }
  public static async setStatusByIdKaryawan(id: String, status: String) {
    const absRef = collection(db, "absensi");
    const latestDate = await this.getLatestDate();

    const absRes = await getDocs(
      query(
        absRef,
        where("idKaryawan", "==", id as string),
        where("date", "==", latestDate)
      )
    );
    absRes.forEach((abs) => {
      //   console.log(abs.data(), id);

      const tempAbsRef = doc(db, "absensi", abs.id);
      setDoc(tempAbsRef, { status: status }, { merge: true });
    });
  }
  public static async getLatestAbsensiStatusByIdKaryawan(id: String | null) {
    const absRef = collection(db, "absensi");
    const latestDate = await this.getLatestDate();
    const absRes = await getDocs(
      query(
        absRef,
        where("idKaryawan", "==", id as string),
        where("date", "==", latestDate)
      )
    );
    const status: String[] = [];
    absRes.forEach((doc) => {
      const fetchedData = doc.data() as Absensi;
      status.push(fetchedData.status as string);
    });
    return status[0];
  }
  public static async assignNewAbsensi() {
    const managerGudangs = await User.getUsersByRole("managergudang");
    const staffGudangs = await User.getUsersByRole("staffgudang");
    const combinedUser = [...managerGudangs, ...staffGudangs];
    combinedUser.forEach((user) => {
      user.id ? this.createAbsensi(user.id) : {};
    });
  }
  private static async createAbsensi(id: String) {
    const absRef = collection(db, "absensi");
    const nowDate = new Date();
    await addDoc(absRef, { idKaryawan: id, status: "alfa", date: nowDate });
  }
  public static async getLatestDate() {
    const latestDate = [new Date(Date.UTC(2000))];
    const absRef = collection(db, "absensi");
    const absRes = await getDocs(absRef);
    absRes.forEach((doc) => {
      const fetchedData = doc.data() as Absensi;
      const docTimestamp = fetchedData.date as Timestamp;
      const docDate = docTimestamp.toDate();
      if (docDate.getTime() > latestDate[0].getTime()) {
        latestDate.pop();
        latestDate.push(docDate);
      }
    });
    return latestDate[0];
  }
}
