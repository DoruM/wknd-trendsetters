/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Hero (hero13)'];

  // Find the main grid layout div
  const gridLayout = element.querySelector('.w-layout-grid');
  let imageDiv = null;
  let contentDiv = null;
  if (gridLayout) {
    const directDivs = gridLayout.querySelectorAll(':scope > div');
    imageDiv = directDivs[0] || null;
    contentDiv = directDivs[1] || null;
  }

  // Row 2: Background image
  let backgroundImageCell = '';
  if (imageDiv) {
    // Find first <img> in the image div
    const img = imageDiv.querySelector('img');
    if (img) backgroundImageCell = img;
  }
  const backgroundImageRow = [backgroundImageCell];

  // Row 3: Content (Title, Subheading, CTA)
  // We'll collect all heading and button elements inside contentDiv
  let contentCell = '';
  if (contentDiv) {
    // We'll find all heading elements (h1-h6) and other relevant elements (like button-group)
    const elems = [];

    // Find any headings (should be at least h1)
    const headings = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => elems.push(h));

    // Find any paragraphs (subheading or text)
    const paragraphs = contentDiv.querySelectorAll('p');
    paragraphs.forEach(p => elems.push(p));

    // Find button group (for CTA)
    const buttonGroup = contentDiv.querySelector('.button-group');
    if (buttonGroup) {
      // Add its children (buttons/links) if any
      for (let child of buttonGroup.children) {
        elems.push(child);
      }
    }
    // If nothing found, just push all children as fallback
    if (!elems.length) {
      for (let child of contentDiv.children) {
        elems.push(child);
      }
    }
    if (elems.length === 1) {
      contentCell = elems[0];
    } else if (elems.length > 1) {
      contentCell = elems;
    } else {
      contentCell = '';
    }
  }
  const contentRow = [contentCell];

  // Compose the table rows
  const rows = [headerRow, backgroundImageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
