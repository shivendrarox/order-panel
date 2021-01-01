console.log("yo");

let _data = {
    'email': 'mayankmittal@intugine.com'
   }
   
   let fetched_data={};
   
   fetch('https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch', { method: 'POST', body: JSON.stringify(_data) , headers: {
     "Content-type": "application/json; charset=UTF-8",
   "Authorization": "Bearer " + 'tTU3gFVUdP'} })
   .then(response => response.json())
   .then(data => console.log(data));
