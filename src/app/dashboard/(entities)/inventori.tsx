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
  query,
  setDoc,
} from "firebase/firestore";
import { Barang } from "./barang";

const db = getFirestore(app);

export class Inventori {
  private static async checkSameProduct(products: Barang[]) {
    products.map((product, k) => {
      products.map((productNested, kn) => {
        if (k !== kn) {
          if (product.name === productNested.name) {
            if (product.idProyek === productNested.idProyek) {
              if (product.description === productNested.description) {
                const productQuantity =
                  parseInt(product.quantity as string) +
                  parseInt(productNested.quantity as string);
                Inventori.deleteBarangById(productNested.id as String);
                Inventori.updateBarangById(product.id as String, {
                  ...product,
                  quantity: productQuantity.toString(),
                });
              }
            }
          }
        }
      });
    });
  }
  public static async subscribeDatabase(
    callback: (inventori: Barang[]) => void
  ) {
    onSnapshot(collection(db, "inventori"), (doc) => {
      const inventori: Barang[] = [];
      doc.forEach((data) => {
        const barang = new Barang();
        const fetchedData = data.data() as unknown as Barang;
        barang["id"] = data.id;
        barang["idProyek"] = fetchedData.idProyek;
        barang["budget"] = fetchedData.budget;
        barang["price"] = fetchedData.price;
        barang["name"] = fetchedData.name;
        barang["quantity"] = fetchedData.quantity;
        barang["itemType"] = fetchedData.itemType;
        barang["description"] = fetchedData.description;
        inventori.push(barang);
      });
      Inventori.checkSameProduct(inventori);
      callback(inventori);
    });
  }
  public static async deleteBarangById(id: String) {
    const barRef = doc(db, "inventori", id as string);
    await deleteDoc(barRef);
  }
  public static async updateBarangById(id: String, barang: Barang) {
    const barRef = doc(db, "inventori", id as string);
    const barRes = await setDoc(barRef, { ...barang }, { merge: true });
  }
  public static async createBarang(barang: Barang) {
    const invRef = collection(db, "inventori");
    const invRes = await addDoc(invRef, { ...barang });
    return invRes;
  }
  public static async getBarangById(id: String) {
    const barRef = doc(db, "inventori", id as string);
    const res = await getDoc(barRef);
    const tempBarang: Barang = {};
    const fetchedData = res.data() as unknown as Barang;
    tempBarang["id"] = res.id;
    tempBarang["idProyek"] = fetchedData.idProyek;
    tempBarang["budget"] = fetchedData.budget;
    tempBarang["price"] = fetchedData.price;
    tempBarang["name"] = fetchedData.name;
    tempBarang["quantity"] = fetchedData.quantity;
    tempBarang["itemType"] = fetchedData.itemType;
    tempBarang["description"] = fetchedData.description;
    return tempBarang;
  }
  public static async getBarangsByIdProyek(id: String) {
    //not implemented yet
    const x = [] as Barang[];
    return x;
  }
  public static async putBarangIntoProyek(
    idBarang: String,
    idProyek: String | undefined,
    quantity: String
  ) {
    const oldBarang = await Inventori.getBarangById(idBarang);
    delete oldBarang["id"];

    // console.log(idBarang, idProyek);

    if (
      parseInt(oldBarang["quantity"] as string) <
        parseInt(quantity as string) ||
      isNaN(parseInt(quantity as string))
    ) {
      console.log("cancelled");

      return;
    }
    // console.log({ ...oldBarang, idProyek: idProyek });
    const additionalData = idProyek
      ? ({
          ...oldBarang,
          quantity: quantity,
          idProyek: idProyek,
        } as Barang)
      : ({
          ...oldBarang,
          quantity: quantity,
        } as Barang);
    Inventori.updateBarangById(idBarang, additionalData);
    oldBarang["quantity"] = (
      parseInt(oldBarang.quantity as string) - parseInt(quantity as string)
    ).toString();

    parseInt(oldBarang["quantity"] as string) > 0
      ? Inventori.createBarang(oldBarang)
      : {};

    // const barang: Barang = {
    //   ...oldBarang,
    //   quantity: (
    //     parseInt(oldBarang.quantity as string) - parseInt(quantity as string)
    //   ).toString(),
    // };
    // barang.quantity === "0"
    //   ? inv.deleteBarangById(idBarang)
    //   : inv.updateBarangById(idBarang, barang);
    // oldBarang["id"] = undefined;
    // Inventori.createBarang({
    //   ...oldBarang,
    //   quantity: quantity,
    //   idProyek: idProyek,
    // });
  }
  public static async getAllBarangs() {
    //dipanggil oleh yang bisa melihat barang saja
    const invRef = collection(db, "inventori");
    const invRes = await getDocs(query(invRef));
    const inventori: Barang[] = [];
    invRes.forEach((doc) => {
      const tempBarang: Barang = {};
      const fetchedData = doc.data() as unknown as Barang;
      tempBarang["id"] = doc.id;
      tempBarang["idProyek"] = fetchedData.idProyek;
      tempBarang["budget"] = fetchedData.budget;
      tempBarang["price"] = fetchedData.price;
      tempBarang["name"] = fetchedData.name;
      tempBarang["quantity"] = fetchedData.quantity;
      tempBarang["itemType"] = fetchedData.itemType;
      tempBarang["description"] = fetchedData.description;
      inventori.push(tempBarang);
    });

    return inventori;
  }
}
