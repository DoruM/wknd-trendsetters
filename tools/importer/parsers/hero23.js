/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match example exactly
  const headerRow = ['Hero (hero23)'];

  // Find main grid inside this section
  let mainGrid = element.querySelector('.grid-layout');

  // Find all direct children of the main grid
  let immediateChildren = mainGrid ? mainGrid.querySelectorAll(':scope > *') : [];

  // Variables to hold references
  let imageEl = null;
  let contentSection = null;

  // Find the image and the text content
  immediateChildren.forEach((child) => {
    if (child.tagName === 'IMG' && !imageEl) {
      imageEl = child;
    } else if (child.classList.contains('grid-layout') && !contentSection) {
      // Look for the nested content div (may contain further grid)
      // Look for first div with class 'section' inside this column
      const possibleSection = child.querySelector(':scope > .section');
      if (possibleSection) {
        contentSection = possibleSection;
      }
    }
  });

  // 2nd row: image (may be null if missing, that's OK)
  const imageRow = [imageEl];

  // 3rd row: content block: headline, paragraph, CTAs, in a single cell
  // If contentSection was found, use it directly as the cell content
  const textRow = [contentSection ? contentSection : ''];

  // Compose final table
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
