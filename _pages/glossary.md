---
title: Glossary
permalink: /glossary/
layout: page
---

# Glossary

Use the search box or filters, and click the column headers to sort.

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

  <div class="glossary-control">
    <label for="glossary-category">Category</label>
    <select id="glossary-category" class="glossary-category-select">
      <option value="">All categories</option>
      {% assign categories = site.data.glossary | map: "category" | uniq | sort %}
      {% for cat in categories %}
        {% if cat %}
          <option value="{{ cat }}">{{ cat }}</option>
        {% endif %}
      {% endfor %}
    </select>
  </div>
</div>

<table id="glossary-table" class="glossary-table">
  <thead>
    <tr>
      <th data-sort-key="term">Term</th>
      <th data-sort-key="category">Category</th>
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

<script src="{{ '/js/glossary.js' | relative_url }}"></script>