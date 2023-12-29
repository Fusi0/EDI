function fetchAPI() {
    var apiUrl = 'https://my.api.mockaroo.com/cars.json?key=8200ff40';

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

function createFilterInputs(data) {
    var table = document.getElementById('myTable');
    var headerRow = table.querySelector('tr');

    for (var columnIndex = 0; columnIndex < headerRow.cells.length; columnIndex++) {
        var columnName = headerRow.cells[columnIndex].textContent;

        if (columnName === 'car_brand' || columnName === 'model') {
            var input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Filter ' + columnName;
            input.addEventListener('input', (function (index) {
                return function () {
                    filterTable(); 
                };
            })(columnIndex));
            headerRow.cells[columnIndex].appendChild(input);
        } else if (columnName === 'engine_type') {
            var select = document.createElement('select');
            var options = ['all', 'diesel', 'gasoline', 'gaz', 'electric'];

            options.forEach(option => {
                var optionElement = document.createElement('option');
                optionElement.value = option.toLowerCase();
                optionElement.textContent = option;
                select.appendChild(optionElement);
            });

            select.addEventListener('change', function () {
                filterTable();
            });

            headerRow.cells[columnIndex].appendChild(select);
        }
    }
}

function filterTable() {
    var table, rows, i, x;
    table = document.getElementById('myTable');
    rows = table.rows;

    for (i = 1; i < rows.length; i++) {
        var rowVisible = true;

        for (var columnIndex = 0; columnIndex < table.rows[0].cells.length; columnIndex++) {
            var columnName = table.rows[0].cells[columnIndex].textContent;
            var input = table.rows[0].cells[columnIndex].querySelector('input');
            var select = table.rows[0].cells[columnIndex].querySelector('select');
            var filterValue = input ? input.value.toLowerCase() : (select ? select.value.toLowerCase() : '');

            var cellValue = rows[i].cells[columnIndex].textContent || rows[i].cells[columnIndex].innerText;

            if (columnName === 'engine_type' && filterValue !== 'all' && filterValue !== cellValue.toLowerCase()) {
                rowVisible = false;
                break;
            }

            if (columnName !== 'engine_type' && filterValue !== 'all' && !cellValue.toLowerCase().includes(filterValue)) {
                rowVisible = false;
                break;
            }

        }

        rows[i].style.display = rowVisible ? '' : 'none';
    }
}

window.onload = fetchAPI;
