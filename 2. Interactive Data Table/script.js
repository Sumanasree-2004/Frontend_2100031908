document.addEventListener('DOMContentLoaded', function() {
    const dataTable = document.getElementById('data-table');
    const filterInput = document.getElementById('filter-input');
    const paginationControls = document.getElementById('pagination-controls');
    const sortButton = document.getElementById('sort-button');
  
    const data = [
      { name: 'Ajay', age: 15, city: 'Banglore' },
      { name: 'Alice', age: 17, city: 'New York' },
      { name: 'Appu', age: 20, city: 'Hyderabad' },
      { name: 'Vamshi', age: 22, city: 'Kodad' },
      { name: 'Vishuu', age: 25, city: 'Kodad' },
      
      
    ];
  
    let currentPage = 1;
    const rowsPerPage = 7;
    let sortColumn = null;
    let sortOrder = 1; 
  
    function renderTableRows(data) {
      const tbody = dataTable.querySelector('tbody');
      tbody.innerHTML = '';
  
      data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(cellValue => {
          const td = document.createElement('td');
          td.textContent = cellValue;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    }
  
    function paginater(data, page, rowsPerPage) {
      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      return data.slice(startIndex, endIndex);
    }
  
    function renderPaginationControls(totalRows, rowsPerPage) {
      paginationControls.innerHTML = '';
      const totalPages = Math.ceil(totalRows / rowsPerPage);
  
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = (i === currentPage) ? 'active' : '';
        button.addEventListener('click', function() {
          currentPage = i;
          updateTable();
        });
        paginationControls.appendChild(button);
      }
    }
  
    function updateTable() {
      let filteredData = data.filter(row => {
        return Object.values(row).some(value => 
          value.toString().toLowerCase().includes(filterInput.value.toLowerCase())
        );
      });

      if (sortColumn) {
        filteredData.sort((a, b) => {
          if (a[sortColumn] < b[sortColumn]) return -1 * sortOrder;
          if (a[sortColumn] > b[sortColumn]) return 1 * sortOrder;
          return 0;
        });
      }
      
      const paginatedData = paginater(filteredData, currentPage, rowsPerPage);
      renderTableRows(paginatedData);
      renderPaginationControls(filteredData.length, rowsPerPage);
    }
  
    filterInput.addEventListener('input', function() {
      currentPage = 1;
      updateTable();
    });
  
    sortButton.addEventListener('click', function() {
      sortOrder = -sortOrder; 
      updateTable();
      sortButton.textContent = sortOrder === 1 ? 'Sort Ascending' : 'Sort Descending';
    });
  
    dataTable.querySelectorAll('th').forEach(th => {
      th.addEventListener('click', function() {
        const column = this.textContent.toLowerCase();
        
        if (sortColumn === column) {
          sortOrder = -sortOrder;
        } else {
          sortOrder = 1;
          sortColumn = column;
        }

        updateTable();
      });
    });
  
    updateTable();
});