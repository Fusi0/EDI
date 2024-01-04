function fetchAPI() {
  var apiUrl = "https://my.api.mockaroo.com/cars.json?key=51df27a0"; // here will be api in future

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayData(data);
      createFilterInputs(data[0]);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayData(data) {
  var dataContainer = document.getElementById("fetchAPI");

  var table = document.createElement("table");
  table.id = "myTable";

  var headerRow = table.insertRow();
  for (var key in data[0]) {
    var headerCell = document.createElement("th");
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  }

  data.forEach((item) => {
    var row = table.insertRow();
    for (var key in item) {
      var cell = row.insertCell();
      var cellText = item[key];
      if (key === "vmax") {
        cellText += " km/h";
      } else if (key === "price") {
        cellText += " zł";
      }
      cell.textContent = cellText;
    }
  });

  dataContainer.appendChild(table);
}

function createFilterInputs() {
  var table = document.getElementById("myTable");
  var headerRow = table.querySelector("tr");

  for (
    var columnIndex = 0;
    columnIndex < headerRow.cells.length;
    columnIndex++
  ) {
    var columnName = headerRow.cells[columnIndex].textContent;

    if (
      columnName === "car_brand" ||
      columnName === "model" ||
      columnName === "engine_type"
    ) {
      var input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Filter " + columnName;
      input.addEventListener(
        "input",
        (function (index) {
          return function () {
            filterTable();
          };
        })(columnIndex)
      );
      headerRow.cells[columnIndex].appendChild(input);
    } else if (
      columnName === "year_of_production" ||
      columnName === "price" ||
      columnName === "vmax"
    ) {
      var minInput = document.createElement("input");
      minInput.type = "number";
      minInput.placeholder = "Min";
      minInput.setAttribute("data-columnIndex", columnIndex);
      minInput.addEventListener("input", handleMinMaxFilter);

      var maxInput = document.createElement("input");
      maxInput.type = "number";
      maxInput.placeholder = "Max";
      maxInput.setAttribute("data-columnIndex", columnIndex);
      maxInput.addEventListener("input", handleMinMaxFilter);

      var inputContainer = document.createElement("div");
      inputContainer.appendChild(minInput);
      inputContainer.appendChild(maxInput);

      headerRow.cells[columnIndex].appendChild(inputContainer);
    }
  }
}

function filterTable() {
  var table = document.getElementById("myTable");
  var rows = table.rows;

  for (var i = 1; i < rows.length; i++) {
    var rowVisible = true;

    for (var j = 0; j < table.rows[0].cells.length; j++) {
      var cellValue = rows[i].cells[j].textContent.trim();

      // Apply text filters
      var inputFilters =
        table.rows[0].cells[j].querySelectorAll('input[type="text"]');

      var selectFilter = table.rows[0].cells[j].querySelector("select");
      if (selectFilter) {
        var filterValueSelect = selectFilter.value.toLowerCase();
        var cellValueSelect = cellValue.toLowerCase();
        if (
          filterValueSelect !== "all" &&
          filterValueSelect !== cellValueSelect
        ) {
          rowVisible = false;
          break;
        }
      }

      if (inputFilters.length > 0) {
        var filterValue = inputFilters[0].value.toLowerCase();
        if (
          filterValue !== "" &&
          !cellValue.toLowerCase().includes(filterValue)
        ) {
          rowVisible = false;
          break;
        }
      }

      // Apply select filters

      // Apply min-max filter to the appropriate columns
      if (
        ["year_of_production", "vmax", "price"].includes(
          table.rows[0].cells[j].textContent
        )
      ) {
        var cellValueNum = parseFloat(cellValue) || 0;
        var minInput = table.rows[0].cells[j].querySelector(
          'input[placeholder="Min"]'
        );
        var maxInput = table.rows[0].cells[j].querySelector(
          'input[placeholder="Max"]'
        );
        var filterMin = minInput
          ? parseFloat(minInput.value) || -Infinity
          : -Infinity;
        var filterMax = maxInput
          ? parseFloat(maxInput.value) || Infinity
          : Infinity;

        if (cellValueNum < filterMin || cellValueNum > filterMax) {
          rowVisible = false;
          break;
        }
      }
    }

    rows[i].style.display = rowVisible ? "" : "none";
  }
}

function handleMinMaxFilter() {
  var columnIndex = parseInt(this.getAttribute("data-columnIndex"));
  var minFilterValue =
    parseFloat(
      this.parentNode.querySelector('input[placeholder="Min"]').value
    ) || 0;
  var maxFilterValue =
    parseFloat(
      this.parentNode.querySelector('input[placeholder="Max"]').value
    ) || Infinity;

  filterTableMinMax(columnIndex, minFilterValue, maxFilterValue);

  // Only call filterTable if min or max value is empty
  if (isNaN(minFilterValue) || isNaN(maxFilterValue)) {
    filterTable(); // Apply all other filters
  }
}

function filterTableMinMax(columnIndex) {
  var table = document.getElementById("myTable");
  var rows = table.rows;

  for (var i = 1; i < rows.length; i++) {
    var rowVisible = true;

    for (var j = 0; j < table.rows[0].cells.length; j++) {
      var cellValue = rows[i].cells[j].textContent.trim();

      if (
        ["year_of_production", "vmax", "price"].includes(
          table.rows[0].cells[j].textContent
        )
      ) {
        var cellValueNum = parseFloat(cellValue) || 0;
        var minInput = table.rows[0].cells[j].querySelector(
          'input[placeholder="Min"]'
        );
        var maxInput = table.rows[0].cells[j].querySelector(
          'input[placeholder="Max"]'
        );
        var filterMin = minInput
          ? parseFloat(minInput.value) || -Infinity
          : -Infinity;
        var filterMax = maxInput
          ? parseFloat(maxInput.value) || Infinity
          : Infinity;

        if (cellValueNum < filterMin || cellValueNum > filterMax) {
          rowVisible = false;
          break;
        }
      }

      // Apply other filters to non-min-max columns
      if (j !== columnIndex) {
        var inputFilters =
          table.rows[0].cells[j].querySelectorAll('input[type="text"]');
        if (inputFilters.length > 0) {
          var filterValue = inputFilters[0].value.toLowerCase();
          if (
            filterValue !== "" &&
            !cellValue.toLowerCase().includes(filterValue)
          ) {
            rowVisible = false;
            break;
          }
        }
      }
    }

    rows[i].style.display = rowVisible ? "" : "none";
  }
}

window.onload = fetchAPI;
