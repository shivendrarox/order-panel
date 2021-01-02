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
let g_data;
async function main() {
  let data = await fetchData();
  g_data = data
  console.log(data);
  setCards(data);
}

function setCards(data) {
  let i;
  let del_c = 0,
    int_c = 0,
    ood_c = 0,
    dex_c = 0,
    nfi_c = 0;
  for (i = 0; i < data.length; i++) {
    console.log(data[i]["current_status"]);
    if (data[i]["current_status"] == "Delivered") {
      del_c += 1;
    }
    if (data[i]["current_status"] == "In Transit") {
      int_c += 1;
    }
    if (data[i]["current_status"] == "Out for Delivery") {
      ood_c += 1;
    }
    if (data[i]["current_status"] == "Undelivered") {
      dex_c += 1;
    }
    if (data[i]["current_status"] == "No Information Yet") {
      nfi_c += 1;
    }
  }

  console.log(del_c + "-" + int_c);

  document.getElementById("DEL").innerHTML = del_c;
  document.getElementById("INT").innerHTML = int_c;
  document.getElementById("OOD").innerHTML = ood_c;
  document.getElementById("DEX").innerHTML = dex_c;
  document.getElementById("NFI").innerHTML = nfi_c;

  document.getElementById("DEL-CARD").addEventListener("click", displayTable);
  document.getElementById("INT-CARD").addEventListener("click", displayTable);
  document.getElementById("OOD-CARD").addEventListener("click", displayTable);
  document.getElementById("UND-CARD").addEventListener("click", displayTable);
  document.getElementById("NFI-CARD").addEventListener("click", displayTable);
}

function displayTable(){
alert(event.currentTarget.id.slice(0,3))
let i = 0;
tbody = document.getElementsByTagName("tbody")
tbody[0].innerHTML=""
for(i=0;i<g_data.length;i++){
    if (g_data[i]["current_status_code"] == event.currentTarget.id.slice(0,3) ){
        trow = document.createElement("tr")

        console.log("inside")
        console.log(g_data[i])
        trow.innerHTML=`<th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td> `;
        tbody[0].appendChild(trow)
    }
}
}
window.onload = function () {
  main();
};
