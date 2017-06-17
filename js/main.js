"use strict";

const ITEMS_PER_PAGE = 2;
let starWarsDataG;

(function main () {
  document.addEventListener("DOMContentLoaded", () => {
    const tableRowContainer = document.getElementById("table-body");
    const contentWrapper = document.getElementById("content-wrapper");
    let starWarsData = {};

    if (readDataFromLocalStorage()) {
      starWarsDataG = readDataFromLocalStorage();
      const CURRENT_PAGE = 1;
      const itemsPerPageToDisplay = getItemsDisplayPerPage(starWarsDataG, CURRENT_PAGE);
      deleteRows(tableRowContainer);
      createNameHeightTable(itemsPerPageToDisplay, tableRowContainer);
      createPagination(starWarsDataG);
    } else {
      getStarWarsData(tableRowContainer);
    }

    // Show/Hide
    document.getElementById("show-hide").addEventListener("click", () => {
      if (contentWrapper.style.display === "none") {
        contentWrapper.style.display = "block";
      } else {
        contentWrapper.style.display = "none";
      }
    });

    // Sort button
    document.getElementById("sort-btn").addEventListener("click", () => {
      const sortedStarWarsData = sortNames(starWarsDataG);
      const CURRENT_PAGE = 1;
      const itemsPerPageToDisplay = getItemsDisplayPerPage(sortedStarWarsData, CURRENT_PAGE);
      deleteRows(tableRowContainer);
      createNameHeightTable(itemsPerPageToDisplay, tableRowContainer);
    });
  });
})();

const sortNames = (starWarsData) => {
  const sortedStarWarsData = starWarsData.sort((a, b) => {
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

    let tableCellName = document.createElement("INPUT");
    let tableDataName = document.createTextNode(starWarsName);
    tableCellName.setAttribute("class", "name-data");
    tableCellName.setAttribute("value", starWarsDataArr[i].name);
    tableCellName.setAttribute("name", starWarsDataArr[i].name);
    tableCellName.appendChild(tableDataName);
    tableRow.appendChild(tableCellName);

    let tableCellHeight = document.createElement("TD");
    let tableDataHeight = document.createTextNode(starWarsHeight);
    tableCellHeight.setAttribute("class", "height-data");
    tableCellHeight.appendChild(tableDataHeight);
    tableRow.appendChild(tableCellHeight);

    let editButton = document.createElement("BUTTON");
    editButton.innerText = "Save Edits";
    editButton.addEventListener("click", () => {
      saveEditName(tableCellName.value, tableCellName.name);
    });
    tableRow.appendChild(editButton);

    tableRowContainer.appendChild(tableRow);
  }
};

const getEditedItemIndex = (starWarsData, origName) => {
  for (let i = 0; i < starWarsData.length; i++) {
    if (starWarsData[i].name === origName) {
      return i;
    }
  }
};

const saveEditName = (newName, origName) => {
  const tableRowContainer = document.getElementById("table-body");
  let starWarsData = readDataFromLocalStorage();
  let editedItemIndex = getEditedItemIndex(starWarsData, origName);

  starWarsData[editedItemIndex].name = newName;
  saveDataToLocalStorage(starWarsData);
  starWarsDataG = starWarsData.slice(0);
};

const deleteRows = (tableRowContainer) => {
  while(tableRowContainer.rows.length > 0) {
    tableRowContainer.deleteRow(0);
  }
};

const createPagination = (starWarsData) => {
  const numberOfPages = starWarsData.length / ITEMS_PER_PAGE;
  const tableRowContainer = document.getElementById("table-body");
  let paginaton = document.getElementById("pagination");
  let currentPage = 1;

  const previous = document.createElement("a");
  previous.setAttribute("class", "pagination-nav prev");
  previous.innerText = "Prev";
  previous.addEventListener("click", () => {
    if (currentPage === 1) {
      return;
    }
    currentPage--;
    const itemsPerPageToDisplay = getItemsDisplayPerPage(starWarsDataG, currentPage);
    deleteRows(tableRowContainer);
    createNameHeightTable(itemsPerPageToDisplay, tableRowContainer);
  });

  const next = document.createElement("a");
  next.setAttribute("class", "pagination-nav next");
  next.innerText = "Next";
  next.addEventListener("click", () => {
    if (currentPage === numberOfPages) {
      return;
    }
    currentPage++;
    const itemsPerPageToDisplay = getItemsDisplayPerPage(starWarsDataG, currentPage);
    deleteRows(tableRowContainer);
    createNameHeightTable(itemsPerPageToDisplay, tableRowContainer);
  });

  pagination.appendChild(previous);
  renderPaginationPageNumbers(pagination, numberOfPages)
  pagination.appendChild(next);
};

const renderPaginationPageNumbers = (pagination, numberOfPages) => {
  for (let i = 0; i < numberOfPages; i++) {
    let page = document.createElement("a");
    page.setAttribute("class", "pagination-nav page")
    page.innerText = i + 1;
    pagination.appendChild(page);
  }
};

const getItemsDisplayPerPage = (starWarsData, currentPage) => {
  const beginIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = beginIndex + ITEMS_PER_PAGE;
  const displayedItems = starWarsData.slice(beginIndex, endIndex);

  return displayedItems;
};

const readDataFromLocalStorage = () => {
  const data = localStorage.getItem("starWarsData");
  if (data) {
    return JSON.parse(data);
  }
  return data;
};

const saveDataToLocalStorage = (data) => {
  localStorage.setItem("starWarsData", JSON.stringify(data));
};

const getStarWarsData = (tableRowContainer) => {
  const starWarsDataURL = "https://swapi.co/api/people/";
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
         if (xmlhttp.status == 200) {
           const completeStarWarsData = JSON.parse(xmlhttp.responseText);
           const starWarsData = completeStarWarsData.results;
           saveDataToLocalStorage(starWarsData);
           // Use global Star Wars data variable for sort function
           starWarsDataG = completeStarWarsData.results;
           const currentPage = 1;
           const itemsPerPageToDisplay = getItemsDisplayPerPage(starWarsData, currentPage);
           deleteRows(tableRowContainer);
           createNameHeightTable(itemsPerPageToDisplay, tableRowContainer);
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
