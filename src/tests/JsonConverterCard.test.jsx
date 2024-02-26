import { expect, describe, test, it } from 'vitest';
import { render, screen, userEvent } from './utils/test-utils';
import JsonConverterCard from '@/components/JsonConverterCard';
import { checkJson } from '@/components/JsonConverterCard';

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
    const testText = '{{ "test": true \\}';
    render(<JsonConverterCard />);

    // Act
    const textInput = screen.getByLabelText('Text Input');
    await userEvent.type(textInput, testText);
    userEvent.click(screen.getByRole('button', { name: 'Check-JSON' }));

    // Assert
    expect(await screen.findByText('Check Result:')).toBeInTheDocument();
  });

  it('should increment count on click', async () => {
    render(<JsonConverterCard />);
    userEvent.click(screen.getByRole('button'));
    expect(await screen.findByText(/Check & Beautify/i)).toBeInTheDocument();
  });
});

describe('checkJson test', () => {
  it('should return NG at illegal JSON', async () => {
    // Arrange
    const testText = 'Test Text';

    // Act
    const result = checkJson(testText);

    // Assert
    expect(result).toBe('Not JSON format');
  });

  it('should return OK at legal JSON', async () => {
    // Arrange
    const testText = '{ "test": true }';

    // Act
    const result = checkJson(testText);

    // Assert
    expect(result).toBe('JSON format');
  });
});
