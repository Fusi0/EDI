function fetchAPI() {
    var apiUrl = 'https://my.api.mockaroo.com/cars.json?key=51df27a0';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
            createFilterInputs(data[0]);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayData(data) {
    var dataContainer = document.getElementById('fetchAPI');

    var table = document.createElement('table');
    table.id = 'myTable';

    var headerRow = table.insertRow();
    for (var key in data[0]) {
        var headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    }

    data.forEach(item => {
        var row = table.insertRow();
        for (var key in item) {
            var cell = row.insertCell();
            cell.textContent = item[key];
        }
    });

    dataContainer.appendChild(table);
}

// added filter for car_brand model and engine type
function createFilterInputs() {
    var table = document.getElementById('myTable');
    var headerRow = table.querySelector('tr');

    for (var columnIndex = 0; columnIndex < headerRow.cells.length; columnIndex++) {
        var columnName = headerRow.cells[columnIndex].textContent;

        if (columnName === 'car_brand' || columnName === 'model' || columnName === 'engine_type') {
            var input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Filter ' + columnName;

            input.addEventListener('input', (function (index) {
                return function () {
                    filterTable(index, this.value);
                };
            })(columnIndex));

            headerRow.cells[columnIndex].appendChild(input);
        }
    }
}


function filterTable(columnIndex, filterValue) {
    var table, rows, i, x;
    table = document.getElementById('myTable');
    rows = table.rows;

    for (i = 1; i < rows.length; i++) {
        
        if (columnIndex >= 0 && columnIndex < rows[i].cells.length) {
            var cellValue = rows[i].cells[columnIndex].textContent || rows[i].cells[columnIndex].innerText;

            if (cellValue.toLowerCase().includes(filterValue.toLowerCase())) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

window.onload = fetchAPI;
