const url = `http://localhost:8000/api/v1/`;

export async function getUniversities() {
  const universityUrl = url + "university";
  const unis = await fetch(universityUrl).then(res => {
    return res.json();
  });
  return unis;
}

export async function getSingleUniversity(id) {
  const universityUrl = url + "university/" + id;
  const unis = await fetch(universityUrl).then(res => {
    return res.json();
  });
  return unis;
}
