import { getCategoryREST, getSingleREST } from "./REST";
import { getGraphQL } from "./GraphQL";
/**
 *
 * @param {Indetifies which mode the query is operated in} queryMode
 * @param {Identifies which query is being executed} query
 * @param {ID if a specific object is being queried for} id
 * @param {Category identifier} path
 * @param {Additional categories if present} addons
 * @param {Toggles whether full results or section scores are returned} fullResults
 */
export function switchQuery(queryMode, query, id, path, addons, fullResults) {
  if (queryMode === "REST") {
    return createResultObject(query, id, path, addons, fullResults);
  } else if (queryMode === "GraphQL") {
    return getGraphQL(path, addons, id, fullResults);
  }
}
/**
 * @param {Identifies which query is being executed} query
 * @param {ID if a specific object is being queried for} id
 * @param {Category identifier} path
 * @param {Additional categories if present} addons
 * @param {Toggles whether full results or section scores are returned} fullResults
 */
async function createResultObject(query, id, path, addons, fullResults) {
  let queries = [];

  queries.push(path);

  addons.forEach((addon) => queries.push(addon));

  return await gatherResults(queries, query, id, fullResults);
}
/**
 *
 * @param {The main category, as well as the addon categories} queries
 * @param {query mode} query
 * @param {Identifier of a specific object if queried for} id
 * @param {Toggles whether full results or section scores are returned} fullResults
 */
async function gatherResults(queries, query, id, fullResults) {
  let resultObject = {};
  let promises = queries.map(async (q) => {
    q = q.toLowerCase();
    let category = await SwitchREST(query, id, q);

    if (!fullResults) {
      category = filterCategory(category, q);
    }

    resultObject = Object.assign(resultObject, buildObject(q, category));
  });

  await Promise.all(promises);

  return resultObject;
}
/**
 *
 * @param {The being filtered} category
 * @param {All the results from the REST query} q
 */
function filterCategory(category, q) {
  switch (q) {
    case "universities":
      let filteredArray = [];
      category.forEach((c) => {
        let temp = Object.assign(
          {},
          {
            university_id: c.university_id,
            score_2018: c.score_2018,
            score_2019: c.score_2019,
            score_2020: c.score_2020,
          }
        );

        filteredArray.push(temp);
      });

      return filteredArray;
    case "university":
    case "teaching":
    case "finances":
    case "research":
    case "internationality":
      let filteredCategories = [];
      category.forEach((c) => {
        let temp = Object.assign(
          {},
          {
            university_id: c.university_id,
            section_score: c.section_score,
            year: c.year,
          }
        );

        filteredCategories.push(temp);
      });

      return filteredCategories;
    default:
      return {};
  }
}
/**
 *
 * @param {Results from rest query} q
 * @param {Category being compiled} category
 */
function buildObject(q, category) {
  switch (q) {
    case "universities":
      return { university: category };
    case "university":
      return { university: category };
    case "teaching":
      return { teaching: category };
    case "finances":
      return { finances: category };
    case "research":
      return { research: category };
    case "internationality":
      return { internationality: category };
    default:
      return {};
  }
}
/**
 *
 * @param {Query mode} query
 * @param {ID for specific object being queried} id
 * @param {category being queried} path
 */
async function SwitchREST(query, id, path) {
  switch (query) {
    case "getAll":
      return await getCategoryREST(path);
    case "getByID":
      return await getSingleREST(path, id);
    default:
      break;
  }
}
