import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  writeBatch,
} from "firebase/firestore";

export async function createData(name: String, data: any, context: any) {
  const db = getFirestore(context);

  await addDoc(collection(db, name as string), { data });
}
export async function createDatas(
  name: String,
  data: any[],
  context: any
): Promise<any[]> {
  const db = getFirestore(context);
  var batch = writeBatch(db);
  const ref = collection(db, name as string);
  const oldDatas = await readAllData(name, context);

  data.forEach((data) => {
    // batch.create(ref,data)
    batch.set(doc(ref), { data });
  });

  await batch.commit();
  const newDatas = await readAllData(name, context);
  console.log(oldDatas, newDatas);

  return newDatas
    .filter((newData) => !oldDatas.some((oldData) => oldData.id === newData.id))
    .map((newData) => newData.id);
}
export async function readAllData(name: String, context: any) {
  const db = getFirestore(context);
  const querySnapshot = await getDocs(collection(db, name as string));
  const queriedData: any[] = [];
  querySnapshot.forEach((doc) => {
    const data: { [key: string]: any }[] = [];
    Object.keys(doc.data()["data"]).forEach((key) => {
      data.push({ [key]: doc.data()["data"][key] });
    });

    const dataObj = {};
    for (let i = 0; i < data.length; i++) {
      Object.assign(dataObj, data[i]);
    }
    const newData = { id: doc.id, ...dataObj };
    console.log(newData);
    queriedData.push(newData);
  });
  return queriedData;
}
export async function updateData(
  name: String,
  id: any,
  data: any,
  context: any
) {
  const db = getFirestore(context);
  await setDoc(doc(db, name as string, id), { data });
}
export async function deleteData(name: String, id: any, context: any) {
  const db = getFirestore(context);
  await deleteDoc(doc(db, name as string, id));
}
