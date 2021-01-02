let user = {
  email: "mayankmittal@intugine.com",
};

async function fetchData() {
  let response = await fetch(
    "https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + "tTU3gFVUdP",
      },
      body: JSON.stringify(user),
    }
  );

  let result = await response.json();
  return result;
}

async function main() {
  let data = await fetchData();
  console.log(data);
}

window.onload = function () {
  main();
};
