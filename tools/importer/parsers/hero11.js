/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each contains an image)
  const childDivs = element.querySelectorAll(':scope > div');
  // Find the first <img> in the first child
  let heroImage = null;
  for (const div of childDivs) {
    const img = div.querySelector('img');
    if (img) {
      heroImage = img;
      break;
    }
  }

  // Block header row must be exactly as specified
  const headerRow = ['Hero (hero11)'];
  // The background image row references the existing <img> element directly
  const backgroundImageRow = [heroImage ? heroImage : ''];
  // The text content row is empty, as the source HTML has no headline/subtitle/cta text
  const contentRow = [''];
  
  // Final block table
  const cells = [
    headerRow,
    backgroundImageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace original element with block table
  element.replaceWith(table);
}
