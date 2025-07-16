/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The header row must be a single cell, even if there are multiple columns in the row below
  const headerRow = ['Columns (columns28)'];

  // The second row is an array of all column divs
  const contentRow = columns.map(col => col);

  // Build table: one header row (one cell), one content row (N cells for N columns)
  const cells = [
    headerRow,
    contentRow
  ];

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Ensure the header cell spans all columns for proper alignment
  // WebImporter.DOMUtils.createTable does not add colspan, so we add it manually
  // after creation if needed
  const headerTr = table.querySelector('tr');
  const headerTh = headerTr && headerTr.querySelector('th');
  if (headerTh && columns.length > 1) {
    headerTh.setAttribute('colspan', columns.length);
  }

  // Replace the original element
  element.replaceWith(table);
}
