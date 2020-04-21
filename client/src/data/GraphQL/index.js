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

export async function getAllGraphQL(path, addons) {
  const query = buildQueryString(path, addons);
  const result = await graphQLFetcher(query);

  return getResult(path, result);
}

export async function getSingleGraphQL(path, addons, id) {
  const query = buildQueryString(path, addons, id);
  const result = await graphQLFetcher(query);
  return getResult(path, result);
}

function getResult(path, result) {
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

const searchString = (id) => (id === undefined ? `` : `(search: ${id})`);

function uniQueryString(addons, id, skip) {
  const uni = `
    university_id 
    university_name 
    founding_date 
    country 
    score_2018 
    score_2019 
    score_2020 
    ${skip === true ? "" : getAddonQueryStringForUni(addons)}
  `;

  return uni;
}

function getAddonQueryStringForUni(addons) {
  let queryString = "";
  if (addons.includes("teaching")) {
    queryString =
      queryString +
      `teaching { ${teaQueryString(undefined, undefined, true)} }\n`;
  }

  if (addons.includes("finances")) {
    queryString =
      queryString +
      `finance { ${finQueryString(undefined, undefined, true)} }\n`;
  }

  if (addons.includes("research")) {
    queryString =
      queryString +
      `research { ${resQueryString(undefined, undefined, true)} }\n`;
  }

  if (addons.includes("internationality")) {
    queryString =
      queryString +
      `internationality { ${intQueryString(undefined, undefined, true)} }\n`;
  }

  return queryString;
}

function getUniStringFromAddons(addons) {
  let uni = ``;
  console.log("VITAUFDANSOFDS");
  if (addons.includes("university")) {
    uni = `university {
      ${uniQueryString(undefined, undefined, true)}
    }`;
  }
  return uni;
}

function teaQueryString(addons, id, skip) {
  return ` 
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
  `;
}

function finQueryString(addons, id, skip) {
  return `
    finances_id
    university_id
    private_investments
    government_funding
    institutional_income
    ${skip === true ? "" : getUniStringFromAddons(addons)}
`;
}

function resQueryString(addons, id, skip) {
  return `
    research_id
    university_id
    research_income
    research_grants
    research_ratings
    number_of_citations
    number_of_publications
    ${skip === true ? "" : getUniStringFromAddons(addons)}
    `;
}

function intQueryString(addons, id, skip) {
  return `
    internationality_id
    university_id
    international_students
    international_staff
    ${skip === true ? "" : getUniStringFromAddons(addons)}
  `;
}

function buildQueryString(path, addons, id) {
  const x = `query { get${path}${searchString(id)}{${combineQueryString(
    path,
    addons,
    id
  )}}}`;

  console.log(x);
  return x;
}

function combineQueryString(path, addons, id) {
  switch (path) {
    case "Universities":
      return uniQueryString(addons, id);
    case "Teaching":
      return teaQueryString(addons, id);
    case "Finances":
      return finQueryString(addons, id);
    case "Research":
      return resQueryString(addons, id);
    case "Internationality":
      return intQueryString(addons, id);
    default:
      return ``;
  }
}
