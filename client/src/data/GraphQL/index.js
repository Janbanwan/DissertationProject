const GraphURL = `http://localhost:4000/`;

async function graphQLFetcher(query) {
  return await fetch(GraphURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res);
      return res.data;
    });
}

export async function getUniversitiesGraphQL() {
  const query = `query { getUniversities { university_id university_name founding_date country score_2018 score_2019 score_2020}}`;
  const unis = await graphQLFetcher(query);
  return unis.getUniversities;
}

export async function getSingleUniversityGraphQL(id) {
  const query = `query { getUniversities(search: ${id}) { university_id university_name founding_date country score_2018 score_2019 score_2020}}`;
  const unis = await graphQLFetcher(query);
  return unis.getUniversities;
}
