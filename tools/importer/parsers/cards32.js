/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row exactly as specified
  const headerRow = ['Cards (cards32)'];
  const rows = [headerRow];

  // Each card is a direct child <a> element
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach((card) => {
    // Inside each card, find the grid layout
    const cardGrid = card.querySelector('.w-layout-grid');
    if (!cardGrid) return;

    // Find the image (mandatory, should be the only <img> in the grid)
    const img = cardGrid.querySelector('img');

    // Find the main text container (the first div after the image in the grid)
    let textDiv = null;
    const children = Array.from(cardGrid.children);
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === 'IMG') {
        // Next sibling div is the text content
        for (let j = i + 1; j < children.length; j++) {
          if (children[j].tagName === 'DIV') {
            textDiv = children[j];
            break;
          }
        }
        break;
      }
    }
    if (!textDiv) {
      // Fallback: if not found, try last div
      textDiv = cardGrid.querySelector('div:last-of-type');
    }
    // Compose the text cell: include everything except the image
    // We'll collect: Tag & read time row, heading, paragraph, and 'Read' CTA if present
    const textCellParts = [];
    // Tag and read time (optional)
    const tagsRow = textDiv.querySelector('.flex-horizontal');
    if (tagsRow) textCellParts.push(tagsRow);
    // Heading (h3 or .h4-heading)
    const heading = textDiv.querySelector('h3, .h4-heading');
    if (heading) textCellParts.push(heading);
    // Description
    const desc = textDiv.querySelector('p');
    if (desc) textCellParts.push(desc);
    // CTA: If the last child div contains only the word 'Read', add it
    const divs = Array.from(textDiv.querySelectorAll(':scope > div'));
    if (divs.length > 0) {
      const ctaDiv = divs[divs.length - 1];
      if (
        ctaDiv &&
        ctaDiv.textContent.trim().toLowerCase() === 'read' &&
        (!tagsRow || ctaDiv !== tagsRow)
      ) {
        textCellParts.push(ctaDiv);
      }
    }
    // Push this card row into rows
    rows.push([
      img,
      textCellParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
