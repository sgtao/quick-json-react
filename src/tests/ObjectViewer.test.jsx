import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import ObjectViewer from '@/components/ObjectViewer';

describe('ObjectViewer', () => {
  it('should display blank Object as {}', () => {
    // Arrange
    const testObject = {};

    // Act
    const { container } = render(<ObjectViewer obj={testObject} />);

    // Assert
    const preElement = container.querySelector('pre');
    expect(preElement.textContent).toEqual(`{}`);
  });

  it('should display JSON string with specified style', () => {
    // Arrange
    const testObject = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'NY',
      },
      hobbies: ['Reading', 'Gardening', 'Cooking'],
    };

    // Act
    const { container } = render(<ObjectViewer obj={testObject} />);

    // Assert
    const preElement = container.querySelector('pre');
    expect(preElement).toBeInTheDocument();
    const expectedJsonString = JSON.stringify(testObject, null, 2);
    expect(preElement.textContent).toEqual(expectedJsonString);
  });
});
