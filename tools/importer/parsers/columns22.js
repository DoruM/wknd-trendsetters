/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panes (each tab is a grid in a tab)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get all direct children of the grid (each is a column block)
    const columns = Array.from(grid.children);
    if (columns.length === 0) return; // nothing to do
    // Header: must match the block name exactly
    const headerRow = ['Columns (columns22)'];
    // Row: each cell is the referenced existing element (column)
    const contentRow = columns;
    // Build the table
    const cells = [headerRow, contentRow];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    // Replace grid with block table
    grid.replaceWith(table);
  });
  // The main element is not replaced; only grids inside are replaced with tables.
}