/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid (columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get direct grid children (columns)
  const gridChildren = Array.from(grid.children);
  // Defensive: ensure we have at least two columns as expected
  if (gridChildren.length < 2) return;
  // Reference left and right column blocks
  const leftColumn = gridChildren[0];
  const rightColumn = gridChildren[1];
  // Table header: block name exactly as required
  const headerRow = ['Columns (columns31)'];
  const contentRow = [leftColumn, rightColumn];
  // Build table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  // Replace original element
  element.replaceWith(table);
}
