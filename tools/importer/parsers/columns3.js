/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout which contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid (these are the column containers)
  const columns = Array.from(grid.children);

  // The header must be exactly as specified in the example
  const headerRow = ['Columns (columns3)'];

  // Each column: gather all non-empty child nodes into an array for each cell
  const contentRow = columns.map(col => {
    const nodes = Array.from(col.childNodes).filter(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim() !== '';
      }
      return true;
    });
    // If there's only one node, just return the element/node directly (not as array)
    if (nodes.length === 1) {
      return nodes[0];
    }
    // Else return array of nodes
    return nodes;
  });

  // Compose and replace with the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
