/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for block name
  const headerRow = ['Hero (hero20)'];

  // 2nd row: Background image (optional)
  // Find the first <img> descendant as background image
  let img = element.querySelector('img');
  let imageRow = [img ? img : ''];

  // 3rd row: Title (styled as heading), subheading, CTA (only if present)
  // Try to gather all relevant content, prioritizing semantic structure
  let contentFragments = [];

  // Look for heading (title)
  let heading = element.querySelector('.h4-heading, h1, h2, h3');
  if (heading) contentFragments.push(heading);

  // Subheading and CTA are optional; in this HTML, only heading exists
  // If future variations add subheading/CTA, add logic here

  const contentRow = [contentFragments.length ? contentFragments : ''];

  // Compose table as 1col x 3row
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Build table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element in the DOM
  element.replaceWith(block);
}
