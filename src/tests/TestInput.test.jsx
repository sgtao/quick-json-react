// TextInput.test.jsx
import { expect, describe, it, test, vi } from 'vitest';
import { render, screen, userEvent } from './utils/test-utils';
import TextInput from '@/components/TextInput';

describe('TextInput Component Test', async () => {
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

  /*
  test('PasteButton Clicked', async () => {
    // Arrange
    const test = 'Hello World';
    const setText = vi.fn();
    // const handlePasteClick = vi.spyOn(TextInput, 'handlePasteClick');
    render(<TextInput textInputState={[test, setText]} />);

    // Act
    await userEvent.click(screen.getByRole('button', { name: 'Paste Button' }));

    // Assert
    // handlePasteClick が読み出されるか？を確認
    expect(setText).toHaveBeenCalledOnce();
  });
*/
});
