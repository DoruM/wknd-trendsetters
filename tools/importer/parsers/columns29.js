/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);
  if (children.length < 4) return;

  // Prepare column content
  const leftCol = document.createElement('div');
  if (children[0]) leftCol.appendChild(children[0]);
  if (children[1]) leftCol.appendChild(children[1]);

  const middleCol = document.createElement('div');
  if (children[2]) middleCol.appendChild(children[2]);

  const rightCol = document.createElement('div');
  if (children[3]) rightCol.appendChild(children[3]);

  // Prepare table data: header row and data row
  // Header row: single cell, must span all columns
  const cols = [leftCol, middleCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns29)', '', ''],
    cols
  ], document);
  // Set colspan for the header cell
  const headerRow = table.querySelector('tr');
  if (headerRow) {
    const th = headerRow.querySelector('th');
    if (th) {
      th.setAttribute('colspan', '3');
      // Remove any extra header cells to ensure exactly one header cell
      let sibling = th.nextElementSibling;
      while (sibling) {
        const toRemove = sibling;
        sibling = sibling.nextElementSibling;
        toRemove.parentNode.removeChild(toRemove);
      }
    }
  }
  element.replaceWith(table);
}
