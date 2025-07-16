/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per requirements
  const headerRow = ['Cards (cards18)'];
  const cells = [headerRow];

  // Get all direct card items
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Icon cell: Look for an immediate .icon inside the first child div
    let iconCell = '';
    const firstDiv = cardDiv.querySelector(':scope > div');
    if (firstDiv) {
      const iconDiv = firstDiv.querySelector(':scope > .icon');
      if (iconDiv) {
        iconCell = iconDiv; // Reference the actual .icon div
      }
    }
    // Text cell: Find the first <p> with the text
    let textCell = '';
    const para = cardDiv.querySelector('p');
    if (para) {
      textCell = para;
    }
    cells.push([iconCell, textCell]);
  });

  // Build the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
