"use strict";

main();

let starWarsDataG;

function main () {
  document.addEventListener("DOMContentLoaded", () => {
    const tableRowContainer = document.getElementById("table-body");
    let starWarsData = {};
    getStarWarsData(tableRowContainer);

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
  for (let i = 0; i < starWarsDataArr.length / 2; i++) {
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

const createPagination = (starWarsData) => {
  let paginaton = document.getElementById("pagination");
  const ITEMS_PER_PAGE = 5;
  const numberOfPages = starWarsData.length / ITEMS_PER_PAGE;

  const previous = document.createElement("a");
  previous.setAttribute("class", "pagination-nav prev");
  previous.innerText = "Prev";
  previous.addEventListener("click", () => {
    console.log("clicked on previous!");
  });

  const next = document.createElement("a");
  next.setAttribute("class", "pagination-nav next");
  next.innerText = "Next";
  next.addEventListener("click", () => {
    console.log("clicked on next!");
  });

  pagination.appendChild(previous);

  for (let i = 0; i < numberOfPages; i++) {
    let page = document.createElement("a");
    page.setAttribute("class", "pagination-nav page")
    page.innerText = i + 1;
    page.addEventListener("click", () => {
      console.log("clicked page!");
    });
    pagination.appendChild(page);
  }
  pagination.appendChild(next);
};

const getStarWarsData = (tableRowContainer) => {
  const starWarsDataURL = "http://swapi.co/api/people/";
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
         if (xmlhttp.status == 200) {
           const completeStarWarsData = JSON.parse(xmlhttp.responseText);
           // Temporarily use global Star Wars data global variable
           // used when calling sort function. Should figure out
           // way to avoid global Star wars variable
           starWarsDataG = completeStarWarsData.results;

           const starWarsData = completeStarWarsData.results;
           createNameHeightTable(starWarsData, tableRowContainer);
           createPagination(starWarsData);
           return starWarsData;
         } else if (xmlhttp.status == 400) {
          alert('There was an error 400');
         } else {
          alert('something else other than 200 was returned');
         }
      }
  };
  xmlhttp.open("GET", starWarsDataURL, true);
  xmlhttp.send();
};
