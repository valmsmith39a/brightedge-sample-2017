"use strict";

main();

function main () {
  document.addEventListener("DOMContentLoaded", function() {
     let tableRowContainer = document.getElementById("table-container");

    document.getElementById("new-row-btn").addEventListener("click", function() {
      getStarWarsData(tableRowContainer);
    });

    document.getElementById("name-header").addEventListener("click", function() {
      const rows = document.getElementsByClassName("row-body");
      sortNames(rows);
    });
  });
}

const sortNames = (dataRowsNodeList) => {
  const dataRowsArr = Array.from(dataRowsNodeList);
  let dataRowsArrSorted = dataRowsArr.sort((a,b) => {
    const nameA = a.firstChild.innerText.toLowerCase();
    const nameB = b.firstChild.innerText.toLowerCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return dataRowsArrSorted;
}

const createNameHeightTable = (starWarsData, tableRowContainer) => {
  const starWarsDataArr = starWarsData.results;

  for (let i = 0; i < starWarsDataArr.length; i++) {
    let tableRow = document.createElement("TR");
    tableRow.setAttribute("class", "row-body");
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

const getStarWarsData = (tableRowContainer) => {
  const starWarsDataURL = "http://swapi.co/api/people/";
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
         if (xmlhttp.status == 200) {
           const starWarsData = JSON.parse(xmlhttp.responseText);
           createNameHeightTable(starWarsData, tableRowContainer);
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
