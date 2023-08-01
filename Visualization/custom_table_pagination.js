// custom_pagination_table.js

looker.plugins.visualizations.add({
    options: {
        itemsPerPage: {
            type: "number",
            label: "Items Per Page",
            default: 10,
        },
    },
    create: function (element, config) {
        this.container = element.appendChild(document.createElement("div"));
        this.container.className = "paginated-table-container";
    },
    updateAsync: function (data, element, config, queryResponse, details, done) {
        // Extract the data you need from queryResponse and data objects
        const rows = queryResponse.fields.dimension_like.map((field) => field.name);
        const tableData = data.map((row) => row.map((value) => value.rendered || value.value));

        // Get the current page number from the options or default to 1
        const currentPage = parseInt(config.query_fields.page_number || 1, 10);
        const itemsPerPage = config.query_fields.itemsPerPage || config.options.itemsPerPage.default;
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const visibleRows = tableData.slice(startIdx, endIdx);

        // Render the paginated table
        this.container.innerHTML = this.renderTable(rows, visibleRows);

        // Add pagination controls
        this.addPaginationControls(currentPage, itemsPerPage, data.length);

        done();
    },
    renderTable: function (headers, rows) {
        let html = '<table><thead><tr>';
        headers.forEach((header) => (html += `<th>${header}</th>`));
        html += '</tr></thead><tbody>';
        rows.forEach((row) => {
            html += '<tr>';
            row.forEach((cell) => (html += `<td>${cell}</td>`));
            html += '</tr>';
        });
        html += '</tbody></table>';
        return html;
    },
    addPaginationControls: function (currentPage, itemsPerPage, totalRows) {
        const totalPages = Math.ceil(totalRows / itemsPerPage);

        const paginationContainer = document.createElement("div");
        paginationContainer.className = "pagination-controls";

        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.disabled = currentPage === 1;
        prevButton.onclick = () => this.setPage(currentPage - 1);

        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.disabled = currentPage === totalPages;
        nextButton.onclick = () => this.setPage(currentPage + 1);

        const pageNumberSpan = document.createElement("span");
        pageNumberSpan.textContent = `Page ${currentPage} of ${totalPages}`;

        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(pageNumberSpan);
        paginationContainer.appendChild(nextButton);

        this.container.appendChild(paginationContainer);
    },
    setPage: function (page) {
        const options = { ...this.options, query_fields: { page_number: page } };
        this.trigger("apply", options);
    },
});
