const baseURL = `http://localhost:8000/api/v1/`;
/**
 *
 * @param {Category being queried} path
 */
export async function getCategoryREST(path) {
  path = path === "universities" ? "University" : path;
  const unis = await fetch(baseURL + path).then((res) => {
    return res.json();
  });
  return unis;
}
/**
 *
 * @param {Category being queried} path
 */

export async function getSingleREST(path, id) {
  path = path === "universities" ? "University" : path;
  const Url = baseURL + path + "/" + id;
  const unis = await fetch(Url).then((res) => {
    return res.json();
  });
  return unis;
}
