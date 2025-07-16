/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Hero (hero19)'];

  // 2. Image collage (background images)
  // Locate the grid with images. Use only immediate child grid to avoid accidental nesting.
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let images = [];
  if (grid) {
    // Find all images inside the grid
    images = Array.from(grid.querySelectorAll('img'));
  }
  let imagesContainer = null;
  if (images.length > 0) {
    imagesContainer = document.createElement('div');
    images.forEach(img => {
      imagesContainer.appendChild(img);
    });
  }

  // 3. Hero text content (heading, subheading, buttons)
  // Find the container with headings and buttons
  const content = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  const heroContent = document.createElement('div');
  if (content) {
    // Heading
    const h1 = content.querySelector('h1');
    if (h1) heroContent.appendChild(h1);
    // Subheading (first paragraph)
    const subheading = content.querySelector('p');
    if (subheading) heroContent.appendChild(subheading);
    // Button group or any links/buttons
    const buttonGroup = content.querySelector('.button-group');
    if (buttonGroup) heroContent.appendChild(buttonGroup);
  }

  // Compose the table rows according to example (header, image block, text block)
  const rows = [
    headerRow,
    [imagesContainer ? imagesContainer : ''],
    [heroContent]
  ];

  // Create and insert the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}