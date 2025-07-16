/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block name
  const headerRow = ['Cards (cards8)'];
  // Select all immediate card wrappers
  const cards = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));
  // For each card, get the image element; text cell remains blank
  const rows = cards.map(card => {
    const img = card.querySelector('img');
    // Defensive: if there's no image, handle gracefully
    return [img ? img : '', ''];
  });
  // Assemble the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}