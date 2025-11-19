document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("#glossary-table");
  if (!table) return;

  const headers = table.querySelectorAll("th[data-sort-key]");
  const tbody = table.querySelector("tbody");

  function getCellValue(row, index) {
    return row.children[index].textContent.trim().toLowerCase();
  }

  function sortRows(index, asc) {
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const v1 = getCellValue(a, index);
      const v2 = getCellValue(b, index);

      // Simple locale-aware comparison; numeric-friendly
      return v1.localeCompare(v2, undefined, { numeric: true }) * (asc ? 1 : -1);
    });

    // Re-attach rows in new order
    rows.forEach(row => tbody.appendChild(row));
  }

  headers.forEach((header, index) => {
    let ascending = true;

    header.addEventListener("click", () => {
      // Toggle direction
      ascending = !ascending;

      // Clear previous state classes
      headers.forEach(h => {
        h.classList.remove("sorted-asc", "sorted-desc");
      });

      // Apply new sort + class
      sortRows(index, ascending);
      header.classList.add(ascending ? "sorted-asc" : "sorted-desc");
    });
  });
});