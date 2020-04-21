const baseURL = `http://localhost:8000/api/v1/`;

export async function getCategoryREST(path) {
  path = path === "universities" ? "University" : path;
  console.log(baseURL + path);
  const unis = await fetch(baseURL + path).then((res) => {
    return res.json();
  });
  return unis;
}

export async function getSingleREST(path, id) {
  path = path === "universities" ? "University" : path;
  const Url = baseURL + path + "/" + id;
  console.log(Url);
  const unis = await fetch(Url).then((res) => {
    return res.json();
  });
  return unis;
}
