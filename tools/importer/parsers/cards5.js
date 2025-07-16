/* global WebImporter */
export default function parse(element, { document }) {
  // Header must match exactly
  const headerRow = ['Cards (cards5)'];
  const cardRows = [];
  // There is no text content in the provided HTML - only images in cards
  // Each card is a direct child div with an image (no title, description, or CTA)
  const cardDivs = element.querySelectorAll(':scope > div');
  for (const cardDiv of cardDivs) {
    // The image is a direct descendant (should only be one per card)
    const img = cardDiv.querySelector('img');
    // Defensive: handle missing img gracefully
    cardRows.push([img || '', '']);
  }
  // Create block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...cardRows
  ], document);
  element.replaceWith(table);
}
