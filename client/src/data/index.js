import { getUniversities, getSingleUniversity } from "./REST";

export function switchQuery(query, id, queryMode) {
  switch (query) {
    case "getAll":
      return getUniversities();
    case "getByID":
      console.log(id);
      return getSingleUniversity(id);
    default:
      break;
  }
}
