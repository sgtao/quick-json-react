import { expect, describe, test } from 'vitest';
import { render, screen, fireEvent } from './utils/test-utils';
import HistorySideMenu from '@/components/HistorySideMenu';

describe('HistorySideMenu component', () => {
  let jsonHistory = [
    { key: '24-03-20', value: '{"name": "John"}' },
    { key: '24-03-21', value: '{"name": "Jane"}' },
  ];

  test('renders jsonList correctly', () => {
    render(<HistorySideMenu jsonHistory={jsonHistory} />);
    const menuTitle = screen.getByRole('heading', {
      name: /History of JSONs/i,
    });
    expect(menuTitle).toBeInTheDocument();

    jsonHistory.forEach((item) => {
      const findItem = screen
        .getAllByRole('listitem')
        .find((listItem) => listItem.textContent === item.key);
      expect(findItem).toBeInTheDocument();
    });
  });

  test('clickHandler sets correct shownItem', () => {
    render(<HistorySideMenu jsonHistory={jsonHistory} />);
    const itemIndex = 0;
    const jsonItem = jsonHistory[itemIndex];
    const itemDivision = screen
      .getAllByRole('listitem')
      .find((listItem) => listItem.textContent === jsonItem.key);

    fireEvent.click(itemDivision);

    const modalTitle = screen.getByRole('heading', { name: /Key:/i });
    expect(modalTitle).toBeInTheDocument();
  });

  test('modal opens and closes correctly', () => {
    render(<HistorySideMenu jsonHistory={jsonHistory} />);
    const itemIndex = 0;
    const jsonItem = jsonHistory[itemIndex];
    const itemDivision = screen
      .getAllByRole('listitem')
      .find((listItem) => listItem.textContent === jsonItem.key);

    fireEvent.click(itemDivision);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close Button');
    fireEvent.click(closeButton);

    const closedModal = screen.queryByRole('dialog');
    expect(closedModal).not.toBeInTheDocument();
  });
});
