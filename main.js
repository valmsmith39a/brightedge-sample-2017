"use strict";

document.addEventListener("DOMContentLoaded", function() {
  let tableRowContainer = document.getElementById("table-container");

  document.getElementById("new-row-btn").addEventListener("click", function() {
    let tableRow = document.createElement("TR");

    let tableCellName = document.createElement("TD");
    let tableDataName = document.createTextNode("Luke");
    tableCellName.appendChild(tableDataName);
    tableRow.appendChild(tableCellName);

    let tableCellHeight = document.createElement("TD");
    let tableDataHeight = document.createTextNode("6 feet");

    tableCellHeight.appendChild(tableDataHeight);
    tableRow.appendChild(tableCellHeight);

    tableRowContainer.appendChild(tableRow);
  });
});
