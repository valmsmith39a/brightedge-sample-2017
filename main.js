"use strict";

document.addEventListener("DOMContentLoaded", function() {
  let tableRowContainer = document.getElementById("table-container");
  let starWarsData;

  function createNameHeightTable(starWarsData) {
    const starWarsDataArr = starWarsData.results;

    for (let i = 0; i < starWarsDataArr.length; i++) {
      let tableRow = document.createElement("TR");
      const starWarsName = starWarsDataArr[i].name;
      const starWarsHeight = starWarsDataArr[i].height;

      let tableCellName = document.createElement("TD");
      let tableDataName = document.createTextNode(starWarsName);
      tableCellName.appendChild(tableDataName);
      tableRow.appendChild(tableCellName);

      let tableCellHeight = document.createElement("TD");
      let tableDataHeight = document.createTextNode(starWarsHeight);

      tableCellHeight.appendChild(tableDataHeight);
      tableRow.appendChild(tableCellHeight);
      tableRowContainer.appendChild(tableRow);
    }
  }

  function getStarWarsData() {
    const starWarsDataURL = "http://swapi.co/api/people/";
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) {
             starWarsData = JSON.parse(xmlhttp.responseText);
             createNameHeightTable(starWarsData);
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };
    xmlhttp.open("GET", starWarsDataURL, true);
    xmlhttp.send();
  }

  document.getElementById("new-row-btn").addEventListener("click", function() {
    getStarWarsData();
  });
});
