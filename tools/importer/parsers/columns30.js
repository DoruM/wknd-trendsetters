/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with single cell
  const headerRow = ['Columns (columns30)'];

  // Find the grid layout (columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of grid is a column
  const gridItems = Array.from(grid.children);

  // For each column, collect ALL content inside (not just images)
  // Place the WHOLE content of each grid item into the cell (reference the element itself)
  const columnCells = gridItems.map(item => item);

  // Table structure: headerRow (1 cell), then a single row with a cell per column
  const cells = [
    headerRow,
    columnCells
  ];

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
