import { expect, describe, test, it, vi } from 'vitest';
import { cleanup, render, screen, userEvent } from './utils/test-utils';
import JsonConverterCard from '@/components/JsonConverterCard';

describe('JsonConverterCard test', () => {
  test('TextInput should display the entered text', async () => {
    // Arrange
    const testText = 'Test Text';
    render(<JsonConverterCard />);

    // Act
    const textInput = screen.getByLabelText('Text Input');
    await userEvent.type(textInput, testText);
    userEvent.click(screen.getByRole('button'));

    // Assert
    expect(textInput.value).toBe(testText);
  });

  test('TextInput with legal JSON should display JSON format', async () => {
    // Arrange
    const testText = '{{ "test": true \\}';
    render(<JsonConverterCard />);

    // Act
    const textInput = screen.getByLabelText('Text Input');
    await userEvent.type(textInput, testText);
    userEvent.click(screen.getByRole('button'));

    // Assert
    expect(await screen.findByText('Check Result:')).toBeInTheDocument();
  });

  it('should increment count on click', async () => {
    render(<JsonConverterCard />);
    userEvent.click(screen.getByRole('button'));
    expect(await screen.findByText(/Check & Beautify/i)).toBeInTheDocument();
  });
});
