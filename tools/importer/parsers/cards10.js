/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as shown in the example
  const headerRow = ['Cards (cards10)'];
  const rows = [];

  // Each card is an <a.card-link...>
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  cards.forEach((card) => {
    // Image cell: find <img> inside the aspect ratio div
    const imgDiv = card.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }

    // Text cell: collect tag, heading, and description (if present)
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];

    if (textDiv) {
      // Tag (optional)
      const tag = textDiv.querySelector('.tag-group .tag');
      if (tag) textContent.push(tag);
      // Heading (optional, keep all heading levels)
      const heading = textDiv.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textContent.push(heading);
      // Description (optional)
      const desc = textDiv.querySelector('p');
      if (desc) textContent.push(desc);
    }

    rows.push([img, textContent]);
  });

  // Build the table as specified
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  
  element.replaceWith(table);
}
