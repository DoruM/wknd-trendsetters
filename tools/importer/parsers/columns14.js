/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout div containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // For each direct column, we want to gather ALL its content as a single cell
  // This makes the block resilient to columns with multiple elements later
  const columns = Array.from(grid.children).map((col) => {
    // If the column has more than one child, return an array of children (elements only)
    const nodes = Array.from(col.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
    if (nodes.length > 1) {
      return nodes;
    } else if (nodes.length === 1) {
      return nodes[0];
    }
    // If somehow empty, return an empty string
    return '';
  });

  // Prepare the header row, as a single column (per requirements)
  const headerRow = ['Columns (columns14)'];

  // Assemble table rows per block spec: header, then one row with N columns
  const tableRows = [headerRow, columns];

  // Build the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
