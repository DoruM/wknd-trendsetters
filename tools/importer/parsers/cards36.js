/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct card containers (cards are links or blocks)
  // First, locate all .utility-link-content-block elements inside the block, in order
  const cards = Array.from(element.querySelectorAll('.utility-link-content-block'));
  // If not found, fallback to immediate children links/divs
  
  const rows = [['Cards (cards36)']];

  cards.forEach(card => {
    // --- IMAGE ---
    // Find image inside a .utility-aspect-2x3 or .utility-aspect-1x1 or just <img>
    let img = card.querySelector('img');
    // --- TEXT ---
    // Compose the text content, always referencing existing elements
    const textContent = [];
    // Find largest heading in card (prefer h2, then h3, etc)
    let heading = card.querySelector('h2, h3, h4, h5, h6');
    if (heading) textContent.push(heading);
    // Description paragraph
    let para = card.querySelector('p');
    if (para) textContent.push(para);
    // CTA button/link (could be a .button div or .button a)
    let cta = card.querySelector('a.button, .button');
    // Ensure not to push the same element twice if .button is a parent of <a>
    if (cta && !textContent.includes(cta)) textContent.push(cta);

    // Compose row: image in col 1 (may be null), text in col 2 (as array if more than 1)
    rows.push([
      img || '',
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
