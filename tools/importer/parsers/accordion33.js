/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table header
  const rows = [['Accordion']];

  // Get all direct child elements that represent an accordion item
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // TITLE: usually in .w-dropdown-toggle > .paragraph-lg (title div)
    let titleCell = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Prefer .paragraph-lg, fallback to last div with text
      titleCell = toggle.querySelector('.paragraph-lg') ||
                  Array.from(toggle.querySelectorAll('div')).reverse().find(div => div.textContent.trim());
    }
    // CONTENT: nav.accordion-content > .utility-padding-all-1rem > .w-richtext (or the whole nav)
    let contentCell = null;
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      // Prefer the inner rich text, fallback to the whole content area
      const rich = nav.querySelector('.w-richtext');
      contentCell = rich ? rich : nav;
    }
    // Only add a row if both title and content exist and have text
    if (titleCell && contentCell && titleCell.textContent.trim() && contentCell.textContent.trim()) {
      rows.push([titleCell, contentCell]);
    }
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
