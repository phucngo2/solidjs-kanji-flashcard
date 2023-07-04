import { db } from "@/configs";
import { BaseModel, SearchQuery } from "@/shared/types";
import { normalizeDocs } from "@/shared/utils";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { flattenDeep } from "lodash";

interface BaseQueryProps {
  colection: string;
  searchFields: string[];
}

export function BaseQuery<T extends BaseModel>({
  colection,
  searchFields,
}: BaseQueryProps) {
  const collectionRef = collection(db, colection);
  return {
    list: async (): Promise<T[]> => {
      const data = await getDocs(collectionRef);
      return normalizeDocs(data.docs) as T[];
    },

    get: async (id: string): Promise<T> => {
      const itemRef = doc(collectionRef, id);
      const item = await getDoc(itemRef);
      return item.data() as T;
    },

    create: async (item: T) => {
      const res = await addDoc(collectionRef, item);
      return res;
    },

    delete: async (id: string) => {
      const itemRef = doc(collectionRef, id);
      await deleteDoc(itemRef);
    },

    update: async (item: T) => {
      const itemRef = doc(collectionRef, `${item.id}`);
      const res = await updateDoc(itemRef, {
        ...(item as { [key: string]: any }),
      });
      return res;
    },

    search: async (searchQuery: SearchQuery): Promise<T[]> => {
      const { searchKeyword } = searchQuery;

      const queriesResult = await Promise.all(
        searchFields.map((field) => {
          const q = query(
            collectionRef,
            orderBy(field),
            where(field, ">=", searchKeyword.toUpperCase()),
            where(field, "<=", searchKeyword.toUpperCase() + "\uf8ff")
          );

          return getDocs(q);
        })
      );

      const result = flattenDeep(
        queriesResult.map((queryResult) => normalizeDocs(queryResult.docs))
      );

      return result as T[];
    },
  };
}
