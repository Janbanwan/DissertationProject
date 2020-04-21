import { getCategoryREST, getSingleREST } from "./REST";
import { getAllGraphQL, getSingleGraphQL } from "./GraphQL";

export function switchQuery(queryMode, query, id, path, addons) {
  //console.log(queryMode, query, id, path, addons);
  if (queryMode === "REST") {
    return SwitchREST(query, id, path, addons);
  } else if (queryMode === "GraphQL") {
    return SwitchGraphql(query, id, path, addons);
  }
}

function SwitchREST(query, id, path, addons) {
  let resultObject = {};
  switch (query) {
    case "getAll":
      return getCategoryREST(path, addons);
    case "getByID":
      return getSingleREST(path, addons, id);
    default:
      break;
  }
}

function SwitchGraphql(query, id, path, addons) {
  switch (query) {
    case "getAll":
      return getAllGraphQL(path, addons);
    case "getByID":
      return getSingleGraphQL(path, addons, id);
    default:
      break;
  }
}
