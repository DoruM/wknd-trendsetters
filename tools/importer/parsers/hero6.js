/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we use the block name as the header exactly as in the example
  const headerRow = ['Hero (hero6)'];
  
  // Find background image: the image with .utility-position-absolute should be the main background
  let bgImg = element.querySelector('img.cover-image.utility-position-absolute');
  // Fallback: if not found, use the first image at the outermost level
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  
  // Find the main content area: typically the .card-body inside the .card
  let contentCell = null;
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    contentCell = cardBody;
  } else {
    // Fallback: try the first div containing a heading, paragraph, or button
    contentCell = Array.from(element.querySelectorAll('div')).find(
      div => div.querySelector('h1, h2, h3, h4, h5, h6, p, a, button')
    ) || element;
  }
  
  // Compose the rows for the table in the correct order
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''], // background image row; empty if not found
    [contentCell]         // content row; always present
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
