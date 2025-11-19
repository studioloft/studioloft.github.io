document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("#glossary-table");
  if (!table) return;

  const headers = table.querySelectorAll("th[data-sort-key]");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  const searchInput = document.querySelector("#glossary-search");
  const categorySelect = document.querySelector("#glossary-category");

  function getCellValue(row, index) {
    return row.children[index].textContent.trim().toLowerCase();
  }

  function sortRows(index, asc) {
    const visibleRows = rows.slice().filter(row => row.style.display !== "none");

    visibleRows.sort((a, b) => {
      const v1 = getCellValue(a, index);
      const v2 = getCellValue(b, index);

      return v1.localeCompare(v2, undefined, { numeric: true }) * (asc ? 1 : -1);
    });

    visibleRows.forEach(row => tbody.appendChild(row));
  }

  function applyFilters() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const selectedCategory = (categorySelect?.value || "").trim().toLowerCase();

    rows.forEach(row => {
      const term = row.querySelector(".glossary-term")?.textContent.toLowerCase() || "";
      const category = row.querySelector(".glossary-category")?.textContent.toLowerCase() || "";
      const summary = row.querySelector(".glossary-summary")?.textContent.toLowerCase() || "";

      const matchesSearch =
        !query ||
        term.includes(query) ||
        category.includes(query) ||
        summary.includes(query);

      const matchesCategory =
        !selectedCategory || category === selectedCategory;

      row.style.display = matchesSearch && matchesCategory ? "" : "none";
    });
  }

  // Sorting handlers
  headers.forEach((header, index) => {
    let ascending = true;

    header.addEventListener("click", () => {
      ascending = !ascending;

      headers.forEach(h => {
        h.classList.remove("sorted-asc", "sorted-desc");
      });

      sortRows(index, ascending);
      header.classList.add(ascending ? "sorted-asc" : "sorted-desc");
    });
  });

  // Filter + search handlers
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      applyFilters();
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      applyFilters();
    });
  }
});