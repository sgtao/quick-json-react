import { expect, describe, test, vi } from 'vitest';
import { render, screen } from './utils/test-utils';
import App from '@/App';
import { setStorageItem } from '../libs/accessLocalStorage';

describe('App working test', () => {
  const mockWindowLocation = (url) => {
    delete window.location;
    window.location = new URL(url);
  };

  test('the title is visible', () => {
    render(<App />);
    expect(screen.getByText(/quick-json-react/i)).toBeInTheDocument();
    expect(screen.getByText(/Hisotry of JSONs/i)).toBeInTheDocument();
  });
  test('when url has json query, get query parameters', () => {
    mockWindowLocation('http://localhost:3000/json?encoded=%7B%7D');
    console.log(window.location.href);
    render(<App />);
    expect(screen.getByText(/{}/i)).toBeInTheDocument();
  });
  test('if localStorage has anything, run consoleJsonLists', () => {
    // テスト用にLocalStorageにデータを設定
    setStorageItem('{}');
    console.log = vi.fn();

    render(<App />);
    // expect(screen.getByText(/quick-json-react/i)).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith('- stringJson: "{}"');

    // テスト後にLocalStorageをクリア
    localStorage.clear();
  });
});
