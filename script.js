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
    setCards(data)

}

function setCards(data){
//this.data = data;
let i;
let del_c=0, int_c=0, ood_c=0, dex_c=0, nfi_c=0;
for (i=0;i<data.length;i++){
    console.log(data[i]["current_status"]);
    if (data[i]["current_status"] == "Delivered"){
        del_c+=1
    }
    if (data[i]["current_status"] == "In Transit"){
        int_c+=1
    }
    if (data[i]["current_status"] == "Out for Delivery"){
        ood_c+=1
    }
    if (data[i]["current_status"] == "Undelivered"){
        dex_c+=1
    }
    if (data[i]["current_status"] == "No Information Yet"){
        nfi_c+=1
    }
}

console.log(del_c+"-"+int_c)

}

window.onload = function () {
  main();
};
