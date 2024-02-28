import { expect, describe, it } from 'vitest';
import { render, screen } from './utils/test-utils';
import App from '../App';

describe('App working test', () => {
  it('the title is visible', () => {
    render(<App />);
    expect(screen.getByText(/quick-json-react/i)).toBeInTheDocument();
  });
});
