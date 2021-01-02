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
  g_data = data;
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

function displayTable() {
  event.stopImmediatePropagation();
  event.stopPropagation();
  //alert(event.currentTarget.id.slice(0, 3));
  let i = 0;
  tbody = document.getElementsByTagName("tbody");
  tbody[0].innerHTML = "";
  for (i = 0; i < g_data.length; i++) {
    if (
      g_data[i]["current_status_code"] == event.currentTarget.id.slice(0, 3)
    ) {
      trow = document.createElement("tr");
      trow.addEventListener("click", renderTimeline);
      console.log("inside");
      console.log(g_data[i]);

      let etd;
      if (g_data[i]["current_status"] == "No Information Yet") {
        etd = "N/A";
      } else {
        etd = g_data[i]["extra_fields"]["expected_delivery_date"];
      }
      trow.innerHTML = `<th scope="row">${g_data[i]["awbno"]}</th>
        <td>${g_data[i]["carrier"]}</td>
        <td>${g_data[i]["from"]}</td>
        <td>${g_data[i]["to"]}</td>
        <td>USPA</td>
        <td>${etd}</td>
        <td>${g_data[i]["current_status"]}</td> `;
      tbody[0].appendChild(trow);
    }
  }
}

function renderTimeline() {
  event.stopImmediatePropagation();
  event.stopPropagation();
  let awbno = event.currentTarget.firstChild.innerHTML;
  //alert(awbno);
  let time_line = document.getElementById("timeline");
  time_line.innerHTML = "";
  let i;
  for (i = 0; i < g_data.length; i++) {
    if (g_data[i]["awbno"] == awbno) {
        let y;
        for (y=0;y<g_data[i]["scan"].length;y++){
            let time_line_item = document.createElement("li");

      time_line_item.innerHTML = `
          <li style="width:90%;" class="timeline-item bg-white rounded ml-3 p-4 shadow">
                  <div class="timeline-arrow"></div>
                  
                  <p class=" small text-gray mb-0">${g_data[i]["scan"][y]["status_detail"]}</p>
                  <p class="pt-3 small text-gray"
                    ><i class="fa fa-clock-o mr-1"></i>${g_data[i]["scan"][y]["location"]}</p
                  >
                  <p class=" small text-gray"
                    ><i class="fa fa-clock-o mr-1"></i>${g_data[i]["scan"][y]["time"]}</p
                  >
                </li>
          `;
          time_line.appendChild(time_line_item)
        }
      
    }
  }
}

window.onload = function () {
  main();
};
