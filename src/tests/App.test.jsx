import { expect, describe, test, vi } from 'vitest';
import { render, screen } from './utils/test-utils';
import App from '@/App';

describe('App working test', () => {
  const mockWindowLocation = (url) => {
    delete window.location;
    window.location = new URL(url);
  };

  test('the title is visible', () => {
    render(<App />);
    expect(screen.getByText(/quick-json-react/i)).toBeInTheDocument();
  });
  test('when url has json query, get query parameters', () => {
    mockWindowLocation('http://localhost:3000/json?encoded=%7B%7D');
    console.log(window.location.href);
    render(<App />);
    expect(screen.getByText(/{}/i)).toBeInTheDocument();
  });
  test('if localStorage has anything, run consoleJsonLists', () => {
    // テスト用にLocalStorageにデータを設定
    localStorage.setItem('test-key-1', '{}');
    console.log = vi.fn();

    render(<App />);
    // expect(screen.getByText(/quick-json-react/i)).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith('stringJson is {}');

    // テスト後にLocalStorageをクリア
    localStorage.clear();
  });
});
