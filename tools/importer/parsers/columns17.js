/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // There are 3 main blocks in the grid: left content, contact list, and image
  // Let's extract them by their content types
  let leftContent = null;
  let contactList = null;
  let rightImage = null;

  // Find left content (has h2 & h3), contactList (ul), image (img)
  gridChildren.forEach(child => {
    if (!leftContent && child.querySelector('h2') && child.querySelector('h3')) leftContent = child;
    else if (!contactList && child.tagName === 'UL') contactList = child;
    else if (!rightImage && child.tagName === 'IMG') rightImage = child;
  });

  // Compose the left column content with leftContent and contactList
  const leftColFragment = document.createElement('div');
  if (leftContent) leftColFragment.appendChild(leftContent);
  if (contactList) leftColFragment.appendChild(contactList);

  // Compose cells for the data row
  const dataRow = [leftColFragment, rightImage || ''];

  // Create the table manually to ensure header row is one cell spanning all columns
  const table = document.createElement('table');
  // Header row
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = 'Columns (columns17)';
  headerTh.colSpan = dataRow.length; // Ensure the header spans all columns
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);
  // Data row
  const dataTr = document.createElement('tr');
  dataRow.forEach(cell => {
    const td = document.createElement('td');
    if (typeof cell === 'string') {
      td.textContent = cell;
    } else {
      td.appendChild(cell);
    }
    dataTr.appendChild(td);
  });
  table.appendChild(dataTr);

  element.replaceWith(table);
}
