/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row using exact block name from the requirements
  const cells = [['Cards (cards24)']];

  // Select all direct child card <a> elements
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // --- Image Cell ---
    // The image is inside a .utility-aspect-2x3 div
    let img = null;
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    if (imageDiv) {
      img = imageDiv.querySelector('img');
    }

    // --- Text Cell ---
    // Compose a container for all text content
    const textWrap = document.createElement('div');

    // Tag and date (can be multiple tags, always in flex-horizontal)
    const tagDate = card.querySelector('.flex-horizontal');
    if (tagDate) {
      // Reference the tagDate element directly
      textWrap.appendChild(tagDate);
    }

    // Title (h3)
    const title = card.querySelector('h3, .h4-heading');
    if (title) {
      textWrap.appendChild(title);
    }

    // No description in this particular example (would appear below h3)

    // Add this card as a new row to the table
    cells.push([
      img ? img : '',
      textWrap
    ]);
  });

  // Build the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
