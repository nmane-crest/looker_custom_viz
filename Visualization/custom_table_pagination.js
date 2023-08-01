looker.plugins.visualizations.add({
    create: function (element, config) {
        console.log("Create function started..");
        var chart = document.createElement('table');
        chart.id = 'custom-table-chart';
        chart.className = 'table table-bordered table-striped'; // Add DataTables classes
        element.appendChild(chart);
        var style = document.createElement('style');
        style.innerHTML = `table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        .pagination {
          display: flex;
          list-style-type: none;
          padding: 0;
          margin: 10px 0;
        }
        .pagination li {
          margin-right: 5px;
          cursor: pointer;
          padding: 5px 10px;
          border: 1px solid #ccc;
          background-color: #f9f9f9;
        }
        .pagination li.active {
          font-weight: bold;
          background-color: #007bff;
          color: white;
        }
        .pagination li.disabled {
          pointer-events: none;
          color: #ccc;
        }`;
        element.appendChild(style);
        console.log("chart element added..");
    },
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        console.log("update function started..");
        var chart = element.querySelector('#custom-table-chart');
        console.log("chart Object:", chart)
        chart.innerHTML = '';

        // Add pagination variables
        var currentPage = 1;
        var rowsPerPage = 1; // Change this to set the number of rows per page

        // Calculate number of pages
        var totalPages = Math.ceil(data.length / rowsPerPage);

        // Calculate start and end indices for the current page
        var startIndex = (currentPage - 1) * rowsPerPage;
        var endIndex = startIndex + rowsPerPage;

        var headerRow = document.createElement('tr');
        for (var i of queryResponse.fields.dimensions) {
            var th = document.createElement('th');
            th.textContent = i.name;
            headerRow.appendChild(th);
        }
        chart.appendChild(headerRow);

        // Create table rows for the current page
        for (var i = startIndex; i < endIndex; i++) {
            if (i >= data.length) break; // Break the loop if end index exceeds data length
            var row = data[i];
            var rows = document.createElement('tr');
            Object.keys(row).forEach(function (key) {
                var td = document.createElement('td');
                td.textContent = row[key].value;
                rows.appendChild(td);
            });
            chart.appendChild(rows);
        }

        // Create pagination controls
        var pagination = document.createElement('ul');
        pagination.className = 'pagination';

        // Previous Page
        var prevLi = document.createElement('li');
        prevLi.textContent = '«';
        prevLi.addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                this.updateTable(data, element, queryResponse, currentPage, rowsPerPage);
            }
        }.bind(this)); // Bind context here
        if (currentPage === 1) {
            prevLi.classList.add('disabled');
        }
        pagination.appendChild(prevLi);

        // Current Page
        var currentPageLi = document.createElement('li');
        currentPageLi.textContent = currentPage;
        currentPageLi.classList.add('active');
        pagination.appendChild(currentPageLi);

        // Next Page
        var nextLi = document.createElement('li');
        nextLi.textContent = '»';
        nextLi.addEventListener('click', function () {
            if (currentPage < totalPages) {
                currentPage++;
                this.updateTable(data, element, queryResponse, currentPage, rowsPerPage);
            }
        }.bind(this)); // Bind context here
        if (currentPage === totalPages) {
            nextLi.classList.add('disabled');
        }
        pagination.appendChild(nextLi);

        // Add DataTables style class to pagination
        pagination.classList.add('pagination');

        chart.appendChild(pagination);

        doneRendering()
    },
    updateTable: function (data, element, queryResponse, currentPage, rowsPerPage) {
        var chart = element.querySelector('#custom-table-chart');
        chart.innerHTML = '';

        // Calculate number of pages
        var totalPages = Math.ceil(data.length / rowsPerPage);

        // Calculate start and end indices for the current page
        var startIndex = (currentPage - 1) * rowsPerPage;
        var endIndex = startIndex + rowsPerPage;

        var headerRow = document.createElement('tr');
        for (var i of queryResponse.fields.dimensions) {
            var th = document.createElement('th');
            th.textContent = i.name;
            headerRow.appendChild(th);
        }
        chart.appendChild(headerRow);

        // Create table rows for the current page
        for (var i = startIndex; i < endIndex; i++) {
            if (i >= data.length) break; // Break the loop if end index exceeds data length
            var row = data[i];
            var rows = document.createElement('tr');
            Object.keys(row).forEach(function (key) {
                var td = document.createElement('td');
                td.textContent = row[key].value;
                rows.appendChild(td);
            });
            chart.appendChild(rows);
        }

        // Update pagination controls
        var pagination = element.querySelector('.pagination');
        pagination.innerHTML = '';

        // Previous Page
        var prevLi = document.createElement('li');
        prevLi.textContent = '«';
        prevLi.addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                this.updateTable(data, element, queryResponse, currentPage, rowsPerPage);
            }
        }.bind(this)); // Bind context here
        if (currentPage === 1) {
            prevLi.classList.add('disabled');
        }
        pagination.appendChild(prevLi);

        // Current Page
        var currentPageLi = document.createElement('li');
        currentPageLi.textContent = currentPage;
        currentPageLi.classList.add('active');
        pagination.appendChild(currentPageLi);

        // Next Page
        var nextLi = document.createElement('li');
        nextLi.textContent = '»';
        nextLi.addEventListener('click', function () {
            if (currentPage < totalPages) {
                currentPage++;
                this.updateTable(data, element, queryResponse, currentPage, rowsPerPage);
            }
        }.bind(this)); // Bind context here
        if (currentPage === totalPages) {
            nextLi.classList.add('disabled');
        }
        pagination.appendChild(nextLi);
    }
});
