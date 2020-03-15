const allUniversities = `http://localhost:8000/api/v1/university/`;

export async function getUniversitiesREST() {
  const unis = await fetch(allUniversities).then(res => {
    return res.json();
  });
  return unis;
}

export async function getSingleUniversityREST(id) {
  const universityUrl = allUniversities + id;
  const unis = await fetch(universityUrl).then(res => {
    return res.json();
  });
  return unis;
}
