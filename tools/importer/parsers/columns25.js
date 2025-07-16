/* global WebImporter */
export default function parse(element, { document }) {
  // Find main grid inside container
  const container = element.querySelector('.container');
  if (!container) return;
  // The grid with content
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the headline, quote, attribution (flex-horizontal), and SVG
  const headline = grid.querySelector('.h2-heading');
  const quote = grid.querySelector('.paragraph-lg');
  const flex = grid.querySelector('.flex-horizontal'); // avatar + name/role
  const svg = grid.querySelector('svg');

  // Compose the left column's content
  const leftColContent = [];
  if (headline) leftColContent.push(headline);
  if (quote) leftColContent.push(quote);
  if (flex) leftColContent.push(flex);

  // Compose the right column's content (SVG as the image/visual)
  const rightColContent = [];
  if (svg) rightColContent.push(svg);

  // Table cell structure: header, then a single row with two columns
  const cells = [
    ['Columns (columns25)'],
    [leftColContent, rightColContent],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
