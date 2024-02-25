import { expect, describe, it } from 'vitest';
import { render, screen, userEvent } from './utils/test-utils';
import JsonConverterCard from '@/components/JsonConverterCard';

describe('JsonConverterCard test', () => {
  it('should increment count on click', async () => {
    render(<JsonConverterCard />);
    userEvent.click(screen.getByRole('button'));
    expect(await screen.findByText(/count is 1/i)).toBeInTheDocument();
  });
});
