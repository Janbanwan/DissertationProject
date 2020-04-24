const GraphURL = `http://localhost:4000/`;
/**
 * Sends the query to the graphql endpoint
 *
 * @param {Query string to be sent to the backend} query
 */
async function graphQLFetcher(query) {
  return await fetch(GraphURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res.data;
    });
}
/**
 *
 * @param {Category identifier} path
 * @param {Additional categories that need to be retrieved} addons
 * @param {ID of an individual objeect (Optional)} id
 * @param {Toggles retrieval of full results or section scores} fullResults
 */
export async function getGraphQL(path, addons, id = undefined, fullResults) {
  const query = buildQueryString(path, addons, id, fullResults);
  const result = await graphQLFetcher(query);

  return getResult(path, result);
}

/**
 * Extracts the result object from the response.
 *
 * Used as the results provided by the category are returned inside graphQL method name.
 * @param {Category identifier} path
 * @param {Result object retrieved from the GraphQL endpoint} result
 */
function getResult(path, result) {
  if (result === undefined) {
    return ``;
  } else {
    switch (path) {
      case "Universities":
        return result.getUniversities;
      case "Teaching":
        return result.getTeaching;
      case "Research":
        return result.getResearch;
      case "Finances":
        return result.getFinances;
      case "Internationality":
        return result.getInternationality;
      default:
        return ``;
    }
  }
}
/**
 *
 * @param {returns the search string if ID is provided} id
 */
const searchString = (id) => (id === undefined ? `` : `(search: ${id})`);
/**
 *
 * @param {Additional categories to be combined to the query} addons
 * @param {ID for object if searching for particular one} id
 * @param {Skips the querying for addons if this method is already called as an addon. } skip
 * @param {Used to determine whether full results or only sections cores are returned} fullResults
 */
function uniQueryString(addons, id, skip, fullResults) {
  const uni = fullResults
    ? `
      university_id 
      university_name 
      founding_date 
      country 
      score_2018 
      score_2019 
      score_2020 
      ${skip === true ? "" : getAddonQueryStringForUni(addons, fullResults)}
    `
    : `
      university_id 
      score_2018 
      score_2019 
      score_2020 
      ${skip === true ? "" : getAddonQueryStringForUni(addons, fullResults)}`;

  return uni;
}
/**
 * Function responsible for generating the additional query string for university object
 *
 * @param {Additional categories required for the query} addons
 * @param {Used to determine whether full results or section scores are returned} fullResults
 */
function getAddonQueryStringForUni(addons, fullResults) {
  let queryString = "";
  if (addons.includes("teaching")) {
    queryString =
      queryString +
      `teaching { ${teaQueryString(
        undefined,
        undefined,
        true,
        fullResults
      )} }\n`;
  }

  if (addons.includes("finances")) {
    queryString =
      queryString +
      `finance { ${finQueryString(
        undefined,
        undefined,
        true,
        fullResults
      )} }\n`;
  }

  if (addons.includes("research")) {
    queryString =
      queryString +
      `research { ${resQueryString(
        undefined,
        undefined,
        true,
        fullResults
      )} }\n`;
  }

  if (addons.includes("internationality")) {
    queryString =
      queryString +
      `internationality { ${intQueryString(
        undefined,
        undefined,
        true,
        fullResults
      )} }\n`;
  }

  return queryString;
}
/**
 *
 * @param {University addon when queried from the rest of the categories} addons
 * @param {Determines whether full results are queried or only section scores} fullResults
 */
function getUniStringFromAddons(addons, fullResults) {
  let uni = ``;
  if (addons.includes("university")) {
    uni = `university {
      ${uniQueryString(undefined, undefined, true, fullResults)}
    }`;
  }
  return uni;
}
/**
 *
 * @param {Addons for the query} addons
 * @param {placeholder not used} id
 * @param {Used to skip execution } skip
 * @param {Toggles whether full results or section scores are returned} fullResults
 */
function teaQueryString(addons, id, skip, fullResults) {
  return fullResults
    ? ` 
    teaching_id
    university_id
    student_satisfaction
    number_of_students
    number_of_undergrads
    number_of_postgrads
    number_of_courses
    passrate
    students_employed
    first_received
    student_per_teacher
    section_score
    year 
    ${skip === true ? "" : getUniStringFromAddons(addons, fullResults)}
  `
    : ` 
  university_id
  section_score
  year 
  ${skip === true ? "" : getUniStringFromAddons(addons, fullResults)}
`;
}
/**
 *
 * @param {Addons for the query} addons
 * @param {placeholder not used} id
 * @param {Used to skip execution } skip
 * @param {Toggles whether full results or section scores are returned} fullResults
 */
function finQueryString(addons, id, skip, fullResults) {
  return fullResults
    ? `
    finances_id
    university_id
    private_investments
    government_funding
    institutional_income
    section_score

    ${skip === true ? "" : getUniStringFromAddons(addons, fullResults)} 
    `
    : `
    university_id
    section_score
  year

    ${skip === true ? "" : getUniStringFromAddons(addons, fullResults)} 
    `;
}
/**
 *
 * @param {Addons for the query} addons
 * @param {placeholder not used} id
 * @param {Used to skip execution } skip
 * @param {Toggles whether full results or section scores are returned} fullResults
 */

function resQueryString(addons, id, skip, fullResults) {
  return fullResults
    ? `
    research_id
    university_id
    research_income
    research_grants
    research_ratings
    number_of_citations
    number_of_publications
    section_score
    ${skip === true ? "" : getUniStringFromAddons(addons, fullResults)}
    `
    : `
    university_id
    section_score
  year

    ${skip === true ? "" : getUniStringFromAddons(addons, fullResults)}
    `;
}
/**
 *
 * @param {Addons for the query} addons
 * @param {placeholder not used} id
 * @param {Used to skip execution } skip
 * @param {Toggles whether full results or section scores are returned} fullResults
 */
function intQueryString(addons, id, skip, fullResults) {
  return fullResults
    ? `
    internationality_id
    university_id
    international_students
    international_staff
    section_score
    ${skip === true ? "" : getUniStringFromAddons(addons, fullResults)}
  `
    : `
  university_id
  section_score
  year
  ${skip === true ? "" : getUniStringFromAddons(addons, fullResults)}
`;
}
/**
 *
 * @param {Category being queried} path
 * @param {Additional categoreis to be queried with the main query} addons
 * @param {ID if a specific object is queried} id
 * @param {{Toggles whether full results or section scores are returned} fullResults
 */
function buildQueryString(path, addons, id, fullResults) {
  return `query { get${path}${searchString(id)}{${combineQueryString(
    path,
    addons,
    id,
    fullResults
  )}}}`;
}
/**
 *
 * @param {Category being queried} path
 * @param {Additional categoreis to be queried with the main query} addons
 * @param {ID if a specific object is queried} id
 * @param {{Toggles whether full results or section scores are returned} fullResults
 */
function combineQueryString(path, addons, id, fullResults) {
  switch (path) {
    case "Universities":
      return uniQueryString(addons, id, false, fullResults);
    case "Teaching":
      return teaQueryString(addons, id, false, fullResults);
    case "Finances":
      return finQueryString(addons, id, false, fullResults);
    case "Research":
      return resQueryString(addons, id, false, fullResults);
    case "Internationality":
      return intQueryString(addons, id, false, fullResults);
    default:
      return ``;
  }
}
