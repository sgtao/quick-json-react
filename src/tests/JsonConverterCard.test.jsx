import { expect, describe, test } from 'vitest';
import { render, screen, userEvent } from './utils/test-utils';
import JsonConverterCard from '@/components/JsonConverterCard';

describe('JsonConverterCard test', () => {
  test('TextInput should display the entered text', async () => {
    // Arrange
    const testText = 'Test Text';
    render(<JsonConverterCard />);

    // Act
    const textInput = screen.getByLabelText('Text Input');
    await userEvent.type(textInput, testText);
    userEvent.click(screen.getByRole('button', { name: 'Check-JSON' }));

    // Assert
    expect(textInput.value).toBe(testText);
  });

  test('TextInput with legal JSON should display JSON format', async () => {
    // Arrange
    const testText = '{{ "test": true }';

    // Act
    render(<JsonConverterCard />);
    const textInput = screen.getByLabelText('Text Input');
    await userEvent.type(textInput, testText);
    userEvent.click(screen.getByRole('button', { name: 'Check-JSON' }));

    // Assert
    expect(
      await screen.findByText('Check Result: JSON format'),
    ).toBeInTheDocument();
  });

  test('TextInput with illegal JSON should display JSON format', async () => {
    // Arrange
    const testText = 'illegal JSON';
    render(<JsonConverterCard />);

    // Act
    const textInput = screen.getByLabelText('Text Input');
    await userEvent.type(textInput, testText);
    userEvent.click(screen.getByRole('button', { name: 'Check-JSON' }));

    // Assert
    expect(
      await screen.findByText('Check Result: Not JSON format'),
    ).toBeInTheDocument();
  });
});
