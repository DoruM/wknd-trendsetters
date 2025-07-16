/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const cells = [['Cards (cards12)']];

  // Helper to extract a card (image + text)
  function extractCard(cardDiv) {
    // Find the image
    const img = cardDiv.querySelector('img');

    // Find the text block (could be nested)
    let textContainer = null;
    // Look for .utility-padding-all-2rem or .utility-position-relative or any div that contains h3/h2/h1
    textContainer = cardDiv.querySelector(
      '.utility-padding-all-2rem, .utility-position-relative'
    );
    // fallback: just the cardDiv
    if (!textContainer) textContainer = cardDiv;

    // Find heading and paragraph in textContainer
    const heading = textContainer.querySelector('h1, h2, h3, h4, h5, h6');
    const para = textContainer.querySelector('p');
    // Build text cell contents, referencing DOM nodes
    const textCell = [];
    if (heading) textCell.push(heading);
    if (para) textCell.push(para);

    // If no heading and no para, fallback to any non-empty text
    if (textCell.length === 0) {
      const text = textContainer.textContent.trim();
      if (text) textCell.push(document.createTextNode(text));
    }
    return [img, textCell];
  }

  // Only elements that look like cards (contain an <img>) should be included
  const cardDivs = Array.from(element.querySelectorAll(':scope > div')).filter(div => div.querySelector('img'));

  cardDivs.forEach(cardDiv => {
    // If the card is a decorative image with no heading or text, just output the image and blank cell
    const hasHeadingOrPara = cardDiv.querySelector('h1,h2,h3,h4,h5,h6,p');
    if (hasHeadingOrPara) {
      cells.push(extractCard(cardDiv));
    } else {
      // Just image, blank text
      const img = cardDiv.querySelector('img');
      cells.push([img, '']);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
