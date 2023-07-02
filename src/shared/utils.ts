import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export function normalizeDocs<T extends QueryDocumentSnapshot<DocumentData>>(
  data: T[]
) {
  return data.map((item) => ({ ...item.data(), id: item.id }));
}

export function getProperty(obj: any, path: string) {
  var properties = path.split(".");
  var result = obj;
  for (var i = 0; i < properties.length; i++) {
    result = result[properties[i]];
    if (result === undefined) {
      break;
    }
  }
  return result;
}

export function setProperty(obj: any, path: string, value: any) {
  var properties = path.split(".");
  var target = { ...obj };
  target[properties[0]][properties[1]] = {
    ...target[properties[0]][properties[1]],
    [properties[2]]: value,
  };
  return target;
}
