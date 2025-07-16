/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match exactly
  const headerRow = ['Hero (hero7)'];

  // Find direct children of the grid-layout
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // 2nd level: <header> > .w-layout-grid > div (bg image + content split)

  // --- Background Image Row ---
  let bgImg = '';
  if (gridDivs.length > 0) {
    // First grid div contains the background image
    const img = gridDivs[0].querySelector('img');
    if (img) {
      bgImg = img;
    }
  }

  // --- Content Row ---
  let contentCell = '';
  if (gridDivs.length > 1) {
    // Second grid div --> nested grid --> card
    const nestedGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (nestedGrid) {
      const card = nestedGrid.querySelector('.card');
      if (card) {
        const contentParts = [];
        // Heading (can be h1, h2, etc)
        const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) contentParts.push(heading);
        // Subheading or paragraph
        const subheading = card.querySelector('p');
        if (subheading) contentParts.push(subheading);
        // Button group
        const btnGroup = card.querySelector('.button-group');
        if (btnGroup) contentParts.push(btnGroup);
        if (contentParts.length) {
          contentCell = contentParts;
        }
      }
    }
  }

  // Compose table
  const cells = [
    headerRow,
    [bgImg],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
