import { db } from "@/configs";
import { Kanji } from "@/models/kanji";
import { normalizeDocs } from "@/shared/utils";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const kanjisCollectionRef = collection(db, "kanjis");

export const KanjiQuery = {
  list: async (): Promise<Kanji[]> => {
    const data = await getDocs(kanjisCollectionRef);
    return normalizeDocs(data.docs) as Kanji[];
  },

  get: async (id: string) => {
    const itemRef = doc(kanjisCollectionRef, id);
    const item = await getDoc(itemRef);
    return item;
  },

  create: async (item: Kanji) => {
    const res = await addDoc(kanjisCollectionRef, item);
    return res;
  },

  delete: async (id: string) => {
    const itemRef = doc(kanjisCollectionRef, id);
    await deleteDoc(itemRef);
  },

  update: async (item: Kanji) => {
    const itemRef = doc(kanjisCollectionRef, item.id);
    const res = await updateDoc(itemRef, { ...item });
    return res;
  },
};
