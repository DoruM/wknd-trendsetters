/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all children of the grid
  const gridChildren = Array.from(grid.children);

  // Identify content and image columns
  let contentCol = null;
  let imageCol = null;
  gridChildren.forEach(child => {
    if (!contentCol && (child.querySelector('h1, p, .button-group'))) {
      contentCol = child;
    }
    if (!imageCol && child.tagName && child.tagName.toLowerCase() === 'img') {
      imageCol = child;
    }
  });
  // Fallback if not found
  if (!contentCol && gridChildren[0]) contentCol = gridChildren[0];
  if (!imageCol && gridChildren[1]) imageCol = gridChildren[1];
  if (!contentCol) contentCol = document.createElement('div');
  if (!imageCol) imageCol = document.createElement('div');

  // Header row: exactly one cell per requirements
  const headerRow = ['Columns (columns15)'];
  // Second row: the actual columns
  const dataRow = [contentCol, imageCol];

  // Build cells, header row is always single-column as required
  const cells = [
    headerRow,
    dataRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
