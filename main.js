"use strict";

main();

let starWarsDataG;
let tableRowContainerG;

function main () {
  document.addEventListener("DOMContentLoaded", function() {
     tableRowContainerG = document.getElementById("table-body");
     console.log("first table Row container g is ", tableRowContainerG);

    document.getElementById("new-row-btn").addEventListener("click", function() {
      getStarWarsData(tableRowContainerG);
    });

    document.getElementById("name-header").addEventListener("click", function() {
      const rows = document.getElementsByClassName("row-body");
      sortNames(rows);
      deleteRows();
      createNameHeightTable(starWarsDataG, tableRowContainerG)
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

const createNameHeightTable = () => {
  const starWarsDataArr = starWarsDataG.results;

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
    tableRowContainerG.appendChild(tableRow);
  }
}

const deleteRows = () => {
  while(tableRowContainerG.rows.length > 0) {
    tableRowContainerG.deleteRow(0);
  }
}

const getStarWarsData = (tableRowContainer) => {
  const starWarsDataURL = "http://swapi.co/api/people/";
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
         if (xmlhttp.status == 200) {
           starWarsDataG = JSON.parse(xmlhttp.responseText);
           createNameHeightTable(starWarsDataG, tableRowContainerG);
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
