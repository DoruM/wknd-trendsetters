/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all immediate children (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Block header row: Only ONE column containing the block name
  const headerRow = ['Columns (columns34)'];

  // Content row: as many columns as the grid children
  const contentRow = columns.map((col) => col);

  // Compose table: first row = header, second row = columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  
  element.replaceWith(table);
}
