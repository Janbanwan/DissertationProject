import { getUniversitiesREST, getSingleUniversityREST } from "./REST";
import { getUniversitiesGraphQL, getSingleUniversityGraphQL } from "./GraphQL";

export function switchQuery(queryMode, query, id) {
  console.log(queryMode, query, id);
  if (queryMode === "REST") {
    return SwitchREST(query, id);
  } else if (queryMode === "GraphQL") {
    return SwitchGraphql(query, id);
  }
}

function SwitchREST(query, id) {
  switch (query) {
    case "getAll":
      return getUniversitiesREST();
    case "getByID":
      return getSingleUniversityREST(id);
    default:
      break;
  }
}

function SwitchGraphql(query, id) {
  switch (query) {
    case "getAll":
      return getUniversitiesGraphQL();
    case "getByID":
      return getSingleUniversityGraphQL(id);
    default:
      break;
  }
}
