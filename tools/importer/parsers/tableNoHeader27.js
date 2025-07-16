/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (no header)'];
  const cells = [headerRow];

  // Find all direct children with class 'divider' (each represents a row)
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach(divider => {
    // Find the .w-layout-grid inside each divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get all immediate children of the grid: should be [heading, answer]
    const gridChildren = Array.from(grid.children).filter(node => node.nodeType === 1);
    if (gridChildren.length < 2) return;
    // Use references to existing elements
    const heading = gridChildren[0];
    const answer = gridChildren[1];
    // Each row is a single cell with an array of both elements (preserving left/right)
    cells.push([[heading, answer]]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
