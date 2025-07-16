/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get the immediate children (columns)
  const columns = Array.from(grid.children);
  // Defensive: expect at least two columns
  if (columns.length < 2) return;
  // Use the actual child elements as-is for each column
  const leftColumn = columns[0];
  const rightColumn = columns[1];
  // Build table structure
  const cells = [
    ['Columns (columns1)'],
    [leftColumn, rightColumn]
  ];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the element with the table
  element.replaceWith(table);
}
