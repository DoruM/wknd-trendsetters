/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid with the columns
  const grid = element.querySelector('.grid-layout, .w-layout-grid');
  let leftCol, rightCol;

  if (grid) {
    // Expecting two children: a div (left) and an img (right)
    const divs = Array.from(grid.children).filter(el => el.tagName === 'DIV');
    const imgs = Array.from(grid.children).filter(el => el.tagName === 'IMG');

    leftCol = divs[0] || null;
    rightCol = imgs[0] || null;
  }

  // Fallbacks in case structure is slightly different
  if (!leftCol) {
    // Look for a DIV that is not the grid container itself
    leftCol = element.querySelector('.grid-layout > div, .w-layout-grid > div');
  }
  if (!rightCol) {
    rightCol = element.querySelector('.grid-layout > img, .w-layout-grid > img');
  }

  // If for some reason we still can't find the columns, just fallback to first div/img in element
  if (!leftCol) leftCol = element.querySelector('div');
  if (!rightCol) rightCol = element.querySelector('img');

  // Defensive: ensure we have placeholder elements if missing
  const leftCell = leftCol || document.createElement('div');
  const rightCell = rightCol || document.createElement('div');

  // Construct the block table
  const cells = [
    ['Columns (columns26)'],
    [leftCell, rightCell],
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
