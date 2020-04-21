const baseURL = `http://localhost:8000/api/v1/`;

export async function getCategoryREST(path, addons) {
  path = path === "Universities" ? "University" : path;
  const unis = await fetch(baseURL + path).then((res) => {
    return res.json();
  });
  return unis;
}

export async function getSingleREST(path, addons, id) {
  path = path === "Universities" ? "University" : path;
  const Url = baseURL + path + "/" + id;
  const unis = await fetch(Url).then((res) => {
    return res.json();
  });
  return unis;
}
