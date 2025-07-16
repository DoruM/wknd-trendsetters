/* global WebImporter */
export default function parse(element, { document }) {
  // Extract columns (direct child divs)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // The header row should be a single cell (as per the markdown example)
  const headerRow = ['Columns (columns37)'];
  // Each cell in the content row is the full content of a column (usually just an image)
  const contentRow = columns.map(col => {
    // If the column only contains an image, use the image; else, use the column itself
    const img = col.querySelector('img');
    if (img && col.children.length === 1) return img;
    return col;
  });
  // Build the table with a single-cell header row followed by the content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}