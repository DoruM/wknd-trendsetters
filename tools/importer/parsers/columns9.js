/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns grid inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get columns: each direct child of the grid is a column
  const columns = Array.from(grid.children);

  // Build the table as per Columns (columns9) block
  const headerRow = ['Columns (columns9)'];
  const columnsRow = columns.map(col => col); // reference actual column elements

  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the footer (element) with the new table
  element.replaceWith(table);
}
