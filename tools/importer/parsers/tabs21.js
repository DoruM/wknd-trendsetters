/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab labels and tab content panes
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = Array.from(tabMenu ? tabMenu.children : []);
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = Array.from(tabContent ? tabContent.children : []);

  // Build table rows: header first (header row is a single cell with 'Tabs')
  const rows = [['Tabs']];

  // For each tab, extract label and content
  for (let i = 0; i < Math.max(tabLinks.length, tabPanes.length); i++) {
    // Tab label: try to find child div, else use textContent
    let label = '';
    if (tabLinks[i]) {
      const labelDiv = tabLinks[i].querySelector('div');
      label = labelDiv && labelDiv.textContent.trim() ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();
    }
    // Tab content: use single child if present, else pane itself
    let content = '';
    if (tabPanes[i]) {
      if (tabPanes[i].children.length === 1) {
        content = tabPanes[i].children[0];
      } else if (tabPanes[i].children.length > 1) {
        content = Array.from(tabPanes[i].children);
      } else {
        content = tabPanes[i];
      }
    }
    // Each row after the header should be a two-cell array: [Tab Label, Tab Content]
    rows.push([label, content]);
  }

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
