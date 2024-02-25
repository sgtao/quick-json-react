// TextInput.test.jsx
import { expect, describe, it, vi } from 'vitest'
import { render, screen, userEvent } from './utils/test-utils'
import TextInput from '../components/TextInput';
// import { input } from '@testing-library/user-event/dist/types/event';

describe('TextInput Component Test', async () => {
    it('should render a text input', () => {
        const textInputState = ['', () => { }]; // Example state for testing
        render(<TextInput textInputState={textInputState} />);
        const inputElement = screen.getByLabelText('Text Input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveAttribute('placeholder', 'Enter JSON text');
    });

    it('should update text state on change', async () => {
        const test = "";
        const setText = vi.fn();
        const inputString = 'Hello World';
        render(<TextInput textInputState={[test, setText]} />);

        const inputElement = screen.getByLabelText('Text Input');
        await userEvent.type(inputElement, inputString);
        
        // setTextに入力値が引数とされているか？を確認
        expect(setText).toHaveBeenCalledWith(inputString[0]);
    });
});