"use strict";

main();

let starWarsDataG;

function main () {
  document.addEventListener("DOMContentLoaded", () => {
    const tableRowContainer = document.getElementById("table-body");

    document.getElementById("new-row-btn").addEventListener("click", () => {
      getStarWarsData(tableRowContainer);
    });

    document.getElementById("name-header").addEventListener("click", () => {
      const sortedStarWarsData = sortNames(starWarsDataG);
      deleteRows(tableRowContainer);
      createNameHeightTable(sortedStarWarsData, tableRowContainer);
    });
  });
}

const sortNames = (starWarsData) => {
  // To avoid mutating initial array
  const starWarsDataCopy = starWarsData.slice(0);
  const sortedStarWarsData = starWarsDataCopy.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sortedStarWarsData;
};

const createNameHeightTable = (starWarsDataArr, tableRowContainer) => {
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
};

const deleteRows = (tableRowContainer) => {
  while(tableRowContainer.rows.length > 0) {
    tableRowContainer.deleteRow(0);
  }
};

const getStarWarsData = (tableRowContainer) => {
  const starWarsDataURL = "http://swapi.co/api/people/";
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
         if (xmlhttp.status == 200) {
           const completeStarWarsData = JSON.parse(xmlhttp.responseText);
           starWarsDataG = completeStarWarsData.results;
           createNameHeightTable(starWarsDataG, tableRowContainer);
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
};
