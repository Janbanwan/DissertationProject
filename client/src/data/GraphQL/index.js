const GraphURL = `http://localhost:4000/`;

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

export async function getAllGraphQL(path, addons, fullResults) {
  const query = buildQueryString(path, addons, undefined, fullResults);
  const result = await graphQLFetcher(query);

  return getResult(path, result);
}

export async function getSingleGraphQL(path, addons, id, fullResults) {
  const query = buildQueryString(path, addons, id, fullResults);
  const result = await graphQLFetcher(query);
  return getResult(path, result);
}

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

const searchString = (id) => (id === undefined ? `` : `(search: ${id})`);

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
      ${skip === true ? "" : getAddonQueryStringForUni(addons)}
    `
    : `
      university_id 
      score_2018 
      score_2019 
      score_2020 
      ${skip === true ? "" : getAddonQueryStringForUni(addons)}`;

  return uni;
}

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

function getUniStringFromAddons(addons, fullResults) {
  let uni = ``;
  if (addons.includes("university")) {
    uni = `university {
      ${uniQueryString(undefined, undefined, true, fullResults)}
    }`;
  }
  return uni;
}

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
    ${skip === true ? "" : getUniStringFromAddons(addons, skip)}
  `
    : ` 
  university_id
  section_score
  year 
  ${skip === true ? "" : getUniStringFromAddons(addons, skip)}
`;
}

function finQueryString(addons, id, skip, fullResults) {
  return fullResults
    ? `
    finances_id
    university_id
    private_investments
    government_funding
    institutional_income
    section_score

    ${skip === true ? "" : getUniStringFromAddons(addons)} 
    `
    : `
    university_id
    section_score
  year

    ${skip === true ? "" : getUniStringFromAddons(addons)} 
    `;
}

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
    ${skip === true ? "" : getUniStringFromAddons(addons)}
    `
    : `
    university_id
    section_score
  year

    ${skip === true ? "" : getUniStringFromAddons(addons)}
    `;
}

function intQueryString(addons, id, skip, fullResults) {
  return fullResults
    ? `
    internationality_id
    university_id
    international_students
    international_staff
    section_score
    ${skip === true ? "" : getUniStringFromAddons(addons)}
  `
    : `
  university_id
  section_score
  year
  ${skip === true ? "" : getUniStringFromAddons(addons)}
`;
}

function buildQueryString(path, addons, id, fullResults) {
  return `query { get${path}${searchString(id)}{${combineQueryString(
    path,
    addons,
    id,
    fullResults
  )}}}`;
}

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
