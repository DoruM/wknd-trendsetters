/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to reference existing children rather than clone
  function childrenArray(parent, selectors) {
    // Return an array of the parent's children matching selectors (in order)
    if (!parent) return [];
    return Array.from(parent.children).filter(el => selectors.some(sel => el.matches(sel)));
  }

  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Get the main grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // -- FIRST CARD (large left card) --
  // This is the first direct child link of the grid
  const gridChildren = Array.from(grid.children);
  let mainCard = null;
  for (const child of gridChildren) {
    if (child.tagName === 'A' && child.classList.contains('utility-link-content-block')) {
      mainCard = child;
      break;
    }
  }
  if (mainCard) {
    // Left cell: image (img element, if present)
    const imageWrapper = mainCard.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = imageWrapper ? imageWrapper.querySelector('img') : null;
    let imageCell = img || '';
    // Right cell: tag, heading, description (in order from existing elements)
    const tagGroup = mainCard.querySelector('.tag-group');
    const heading = mainCard.querySelector('h3, h4, h2, h1');
    const desc = mainCard.querySelector('p');
    let textCell = [];
    if (tagGroup) textCell.push(tagGroup);
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    rows.push([imageCell, textCell]);
  }

  // -- SECOND & THIRD CARDS (right side images + text) --
  // Next direct child is a div.flex-horizontal
  let rightCardsRow = null;
  for (const child of gridChildren) {
    if (
      child.tagName === 'DIV' &&
      child.classList.contains('flex-horizontal') &&
      child.querySelector('img') // Must have an img to be the correct group
    ) {
      rightCardsRow = child;
      break;
    }
  }
  if (rightCardsRow) {
    // Find all a.utility-link-content-blocks (each is a card)
    const cards = rightCardsRow.querySelectorAll('a.utility-link-content-block');
    cards.forEach(card => {
      const imageWrapper = card.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
      let img = imageWrapper ? imageWrapper.querySelector('img') : null;
      let imageCell = img || '';
      // Tag, heading, desc
      const tagGroup = card.querySelector('.tag-group');
      const heading = card.querySelector('h3, h4, h2, h1');
      const desc = card.querySelector('p');
      let textCell = [];
      if (tagGroup) textCell.push(tagGroup);
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      rows.push([imageCell, textCell]);
    });
  }

  // -- REMAINING TEXT-ONLY CARDS (right column, no images) --
  // Last direct child is a div.flex-horizontal with only text cards
  let textCardsRow = null;
  for (let i = gridChildren.length - 1; i >= 0; i--) {
    const child = gridChildren[i];
    if (
      child.tagName === 'DIV' &&
      child.classList.contains('flex-horizontal') &&
      !child.querySelector('img') &&
      child.querySelector('a.utility-link-content-block')
    ) {
      textCardsRow = child;
      break;
    }
  }
  if (textCardsRow) {
    const cards = textCardsRow.querySelectorAll('a.utility-link-content-block');
    cards.forEach(card => {
      // left cell empty
      const heading = card.querySelector('h3, h4, h2, h1');
      const desc = card.querySelector('p');
      let textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      rows.push(['', textCell]);
    });
  }

  // Replace original element with the constructed block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
