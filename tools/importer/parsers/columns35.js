/* global WebImporter */
export default function parse(element, { document }) {
  // Correct: header row must be a single cell with the header
  const headerRow = ['Columns (columns35)'];

  // Find the top-level grid (columns container)
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const grid = container.querySelector(':scope > .w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text/buttons block
  const leftCol = columns[0];
  // Right column: images block
  const rightCol = columns[1];
  // Find the nested grid containing images
  const rightImagesGrid = rightCol.querySelector('.w-layout-grid') || rightCol;

  // Reference the actual elements from the DOM
  // Do NOT clone! Just use the actual elements
  // Each row in the table is an array; content row must have two columns
  const contentRow = [leftCol, rightImagesGrid];

  // Assemble table rows: header (1 col), then content (2 cols)
  const cells = [
    headerRow,    // header row (one cell)
    contentRow    // content row (two cells: left and right columns)
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
