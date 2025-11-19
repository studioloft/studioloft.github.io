---
title: Glossary
permalink: /glossary/
layout: page
---

Use the column headers to sort by term or category.

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
      <td>{{ item.term }}</td>
      <td>{{ item.category }}</td>
      <td>
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