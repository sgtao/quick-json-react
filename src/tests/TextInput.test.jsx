// TextInput.test.jsx
import { expect, describe, it, test, vi, beforeEach, afterAll } from 'vitest';
import { render, screen, userEvent } from './utils/test-utils';
import TextInput from '@/components/TextInput';

describe('TextInput Component Test', async () => {
  beforeEach(() => {
    // jsdom が Clipboard API を実装していないのでダミー実装を用意する
    Object.assign(navigator, {
      clipboard: {
        text: '',
        readText() {
          return Promise.resolve(this.text);
        },
        writeText(data) {
          this.text = data;
          return Promise.resolve();
        },
      },
    });
  });
  afterAll(() => {
    Object.assign(navigator, { clipboard: undefined });
  });

  it('should render a text input', () => {
    const textInputState = ['', () => {}]; // Example state for testing
    render(<TextInput textInputState={textInputState} />);
    const inputElement = screen.getByLabelText('Text Input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter JSON text');
  });

  it('should update text state on change', async () => {
    const test = '';
    const setText = vi.fn();
    const inputString = 'Hello World';
    render(<TextInput textInputState={[test, setText]} />);

    const inputElement = screen.getByLabelText('Text Input');
    await userEvent.type(inputElement, inputString);

    // setTextに入力値が引数とされているか？を確認
    expect(setText).toHaveBeenCalledWith(inputString[0]);
  });

  test('ClearButton clear inputs', async () => {
    // Arrange
    const test = 'Hello World';
    const clearText = vi.fn();
    render(<TextInput textInputState={[test, clearText]} />);

    // Act
    await userEvent.click(screen.getByRole('button', { name: 'Clear Button' }));

    // Assert
    // setText が、引数''で読み出されるか？を確認
    expect(clearText).toHaveBeenCalledOnce();
  });

  test('PasteButton Clicked when Clipboard has something', async () => {
    // Arrange
    const test = 'Hello World';
    navigator.clipboard.writeText(test);
    const setText = vi.fn();
    // const handlePasteClick = vi.spyOn(TextInput, 'handlePasteClick');
    render(<TextInput textInputState={['', setText]} />);

    // Act
    await userEvent.click(screen.getByRole('button', { name: 'Paste Button' }));

    // Assert
    // handlePasteClick が読み出されるか？を確認
    expect(setText).toHaveBeenCalledWith('Hello World');
  });
});

describe('TextInput Component Test in illegal case', async () => {
  beforeEach(() => {
    // jsdom が Clipboard API を実装していないのでダミー実装を用意する
    const readText = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        text: '',
        readText,
        writeText(data) {
          this.text = data;
          return Promise.resolve();
        },
      },
    });
  });
  afterAll(() => {
    Object.assign(navigator, { clipboard: undefined });
  });

  test('PasteButton Clicked when Clipboard is blank.', async () => {
    // Arrange
    // const test = 'Hello World';
    const setText = vi.fn();
    navigator.clipboard.readText.mockRejectedValue(
      new Error('clipboard-error'),
    );
    const alert = vi.fn();
    Object.assign(window, { alert });

    render(<TextInput textInputState={['', setText]} />);

    // Act
    await userEvent.click(screen.getByRole('button', { name: 'Paste Button' }));

    // Assert
    // window.alert が読み出されるか？を確認
    expect(window.alert).toHaveBeenCalledOnce();
  });
});
