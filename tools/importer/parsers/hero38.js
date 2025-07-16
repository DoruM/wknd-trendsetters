/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as per spec
  const headerRow = ['Hero (hero38)'];

  // 2. Find background image (should be in a child grid div as <img>)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let imgEl = null;
  if (grid) {
    const gridDivs = Array.from(grid.children);
    for (const div of gridDivs) {
      const img = div.querySelector('img');
      if (img) {
        imgEl = img;
        break;
      }
    }
  }

  // 3. Find content: heading, paragraph, CTA (button)
  let contentCell = [];
  if (grid) {
    // Find the div containing the content, which has an h1
    const gridDivs = Array.from(grid.children);
    for (const div of gridDivs) {
      const innerGrid = div.querySelector('.w-layout-grid');
      if (innerGrid && innerGrid.querySelector('h1')) {
        // Heading
        const heading = innerGrid.querySelector('h1');
        if (heading) contentCell.push(heading);
        // Subheading/paragraph
        const para = innerGrid.querySelector('p');
        if (para) contentCell.push(para);
        // Call to action (button)
        const btn = innerGrid.querySelector('.button-group a, a.button');
        if (btn) contentCell.push(btn);
        break;
      }
    }
  }
  // If no content found, leave the cell empty
  if (contentCell.length === 0) contentCell = [''];

  // 4. Compose the block table (1 column x 3 rows)
  const rows = [
    headerRow,
    [imgEl ? imgEl : ''],
    [contentCell]
  ];

  // 5. Create the table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
