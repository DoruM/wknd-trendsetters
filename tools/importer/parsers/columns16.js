/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main left (text) and right (images) grid blocks
  const mainGrids = element.querySelectorAll(':scope > .container > .w-layout-grid');
  let leftGrid = null;
  let rightGrid = null;
  if (mainGrids.length > 1) {
    leftGrid = mainGrids[0];
    rightGrid = mainGrids[1];
  } else {
    // Fallback: try by class selectors
    leftGrid = element.querySelector('.grid-layout.tablet-1-column');
    rightGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  }

  // --- LEFT COLUMN: Gather all left (textual) content ---
  let leftColContent = [];
  if (leftGrid) {
    // Get the two main child divs (left heading block and right text/meta/action block)
    const leftDivs = leftGrid.querySelectorAll(':scope > div');
    leftDivs.forEach(div => {
      leftColContent.push(div);
    });
  }

  // --- RIGHT COLUMN: Gather all right (image) content ---
  let rightColContent = [];
  if (rightGrid) {
    const imgDivs = rightGrid.querySelectorAll(':scope > div');
    imgDivs.forEach(div => {
      // Each div should contain a single img
      const img = div.querySelector('img');
      if (img) rightColContent.push(img);
    });
  }

  // Build columns row. Use arrays if multiple elements, or a single element
  const columnsRow = [
    leftColContent.length === 1 ? leftColContent[0] : leftColContent,
    rightColContent.length === 1 ? rightColContent[0] : rightColContent
  ];

  // Compose and replace with block table
  const block = WebImporter.DOMUtils.createTable([
    ['Columns (columns16)'],
    columnsRow
  ], document);

  element.replaceWith(block);
}
