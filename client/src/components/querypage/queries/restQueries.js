const url = `http://localhost:8000/api/v1/`;

export function switchQuery(query, id) {
  switch (query) {
    case "Get all universities":
      return getUniversities();
    case "Get Single University":
      return getSingleUniveristy(id);
    default:
      break;
  }
}

async function getUniversities() {
  const universityUrl = url + "university";
  const unis = await fetch(universityUrl).then(res => {
    return res.json();
  });
  return unis;
}

async function getSingleUniveristy(id) {
  const universityUrl = url + "university/" + id;
  const unis = await fetch(universityUrl).then(res => {
    return res.json();
  });
  return unis;
}
