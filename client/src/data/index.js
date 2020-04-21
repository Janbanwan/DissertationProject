import { getCategoryREST, getSingleREST } from "./REST";
import { getAllGraphQL, getSingleGraphQL } from "./GraphQL";

export function switchQuery(queryMode, query, id, path, addons, fullResults) {
  if (queryMode === "REST") {
    return createResultObject(query, id, path, addons, fullResults);
  } else if (queryMode === "GraphQL") {
    return SwitchGraphql(query, id, path, addons, fullResults);
  }
}

async function createResultObject(query, id, path, addons, fullResults) {
  let queries = [];

  queries.push(path);

  addons.forEach((addon) => queries.push(addon));

  return await gatherResults(queries, query, id, fullResults);
}

async function gatherResults(queries, query, id, fullResults) {
  let resultObject = {};
  let promises = queries.map(async (q) => {
    q = q.toLowerCase();
    console.log(query, id, q);
    let category = await SwitchREST(query, id, q);

    if (!fullResults) {
      category = filterCategory(category, q);
    }

    resultObject = Object.assign(resultObject, buildObject(q, category));
  });

  await Promise.all(promises);

  console.log(resultObject);

  return resultObject;
}

function filterCategory(category, q) {
  console.log(category, q);
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

function SwitchGraphql(query, id, path, addons, fullResults) {
  switch (query) {
    case "getAll":
      return getAllGraphQL(path, addons, fullResults);
    case "getByID":
      return getSingleGraphQL(path, addons, id, fullResults);
    default:
      break;
  }
}
