---
title: Glossary
permalink: /glossary/
layout: page
---

# Glossary

Use the search box or filters. Click **Category** in the header to show/hide categories.

<div class="glossary-controls">
  <div class="glossary-control">
    <label for="glossary-search">Search</label>
    <input
      type="text"
      id="glossary-search"
      class="glossary-search-input"
      placeholder="Search terms, categories, descriptions..."
    >
  </div>
</div>

<table id="glossary-table" class="glossary-table">
  <thead>
    <tr>
      <th data-sort-key="term">Term</th>
      <th id="glossary-category-header">Category</th>
      <th data-sort-key="summary">Summary</th>
    </tr>
  </thead>
  <tbody>
  {% assign items = site.data.glossary | sort: "term" %}
  {% for item in items %}
    <tr>
      <td class="glossary-term">{{ item.term }}</td>
      <td class="glossary-category">{{ item.category }}</td>
      <td class="glossary-summary">
        <strong>{{ item.summary }}</strong>
        {% if item.details %}
          <br>
          <span class="glossary-details">{{ item.details }}</span>
        {% endif %}
      </td>
    </tr>
  {% endfor %}
  </tbody>
</table>

<!-- Inline script to guarantee it runs -->
<script>
document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("glossary-table");
  if (!table) return;

  const headers = table.querySelectorAll("thead th[data-sort-key]");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  const searchInput = document.getElementById("glossary-search");
  const categoryHeader = document.getElementById("glossary-category-header");

  /* ---------- SORTING (Term & Summary only) ---------- */

  function getCellValue(row, index) {
    return row.children[index].textContent.trim().toLowerCase();
  }

  function sortRows(index, asc) {
    const visibleRows = rows.filter(row => row.style.display !== "none");

    visibleRows.sort((a, b) => {
      const v1 = getCellValue(a, index);
      const v2 = getCellValue(b, index);
      return v1.localeCompare(v2, undefined, { numeric: true }) * (asc ? 1 : -1);
    });

    visibleRows.forEach(row => tbody.appendChild(row));
  }

  headers.forEach((header, index) => {
    let ascending = true;

    header.addEventListener("click", () => {
      // Clear sort classes
      headers.forEach(h => h.classList.remove("sorted-asc", "sorted-desc"));
      ascending = !ascending;
      sortRows(index, ascending);
      header.classList.add(ascending ? "sorted-asc" : "sorted-desc");
    });
  });

  /* ---------- CATEGORY FILTER POPUP ---------- */

  // Collect unique categories from table rows
  const categorySet = new Set();
  rows.forEach(row => {
    const catCell = row.querySelector(".glossary-category");
    if (catCell) {
      const text = catCell.textContent.trim();
      if (text) categorySet.add(text);
    }
  });
  const categories = Array.from(categorySet).sort();

  // State: which categories are active (checked)
  const activeCategories = new Set(categories); // start with all enabled

  // Build the popover UI
  const popover = document.createElement("div");
  popover.className = "glossary-category-popover";
  popover.innerHTML = `
    <div class="popover-header">
      <span>Filter Categories</span>
      <button type="button" class="popover-close" aria-label="Close">×</button>
    </div>
    <div class="popover-actions">
      <button type="button" class="popover-select-all">All</button>
      <button type="button" class="popover-clear-all">None</button>
    </div>
    <div class="popover-body"></div>
  `;

  const body = popover.querySelector(".popover-body");

  categories.forEach(cat => {
    const id = "cat-" + cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const wrapper = document.createElement("label");
    wrapper.className = "popover-item";
    wrapper.innerHTML = `
      <input type="checkbox" id="${id}" value="${cat}" checked>
      <span>${cat}</span>
    `;
    body.appendChild(wrapper);
  });

  // Attach popover to the header
  categoryHeader.classList.add("has-category-filter");
  categoryHeader.appendChild(popover);

  // Helper: show/hide popover
  function togglePopover(show) {
    if (show === undefined) {
      popover.classList.toggle("visible");
    } else {
      popover.classList.toggle("visible", show);
    }
  }

  categoryHeader.addEventListener("click", (e) => {
    // Don't close immediately via document click
    e.stopPropagation();
    togglePopover();
  });

  // Close with X
  popover.querySelector(".popover-close").addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopover(false);
  });

  // Close when clicking anywhere else on the page
  document.addEventListener("click", () => {
    togglePopover(false);
  });

  popover.addEventListener("click", (e) => {
    // Keep clicks inside from closing it via document handler
    e.stopPropagation();
  });

  // Select all / clear all
  const selectAllBtn = popover.querySelector(".popover-select-all");
  const clearAllBtn = popover.querySelector(".popover-clear-all");

  selectAllBtn.addEventListener("click", () => {
    activeCategories.clear();
    categories.forEach(cat => activeCategories.add(cat));
    body.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = true);
    applyFilters();
  });

  clearAllBtn.addEventListener("click", () => {
    activeCategories.clear();
    body.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
    applyFilters();
  });

  // Per-checkbox toggle
  body.querySelectorAll("input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", () => {
      const value = cb.value;
      if (cb.checked) {
        activeCategories.add(value);
      } else {
        activeCategories.delete(value);
      }
      applyFilters();
    });
  });

  /* ---------- SEARCH + CATEGORY FILTER APPLY ---------- */

  function applyFilters() {
    const query = (searchInput && searchInput.value || "").trim().toLowerCase();

    rows.forEach(row => {
      const termCell = row.querySelector(".glossary-term");
      const categoryCell = row.querySelector(".glossary-category");
      const summaryCell = row.querySelector(".glossary-summary");

      const term = termCell ? termCell.textContent.toLowerCase() : "";
      const categoryText = categoryCell ? categoryCell.textContent.trim() : "";
      const categoryLower = categoryText.toLowerCase();
      const summary = summaryCell ? summaryCell.textContent.toLowerCase() : "";

      // If no category is selected, show nothing (or show all; your choice)
      const matchesCategory = activeCategories.size === 0
        ? false
        : activeCategories.has(categoryText);

      const matchesSearch =
        !query ||
        term.includes(query) ||
        categoryLower.includes(query) ||
        summary.includes(query);

      row.style.display = (matchesCategory && matchesSearch) ? "" : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // Run once in case you later change default state
  applyFilters();
});
</script>