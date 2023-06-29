import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export function normalizeDocs<T extends QueryDocumentSnapshot<DocumentData>>(
  data: T[]
) {
  return data.map((item) => ({ ...item.data(), id: item.id }));
}
