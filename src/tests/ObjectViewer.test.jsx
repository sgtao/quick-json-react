import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import ObjectViewer from '@/components/ObjectViewer';

describe('ObjectViewer', () => {
  it('should display blank Object as {}', () => {
    // Arrange
    const testObject = {};

    // Act
    const { getByText } = render(<ObjectViewer obj={testObject} />);

    // Assert
    expect(getByText(`{}`)).toBeInTheDocument();
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
    const divElements = container.querySelectorAll('div');
    console.log(divElements);
    let found;
    divElements.forEach((element) => {
      if (element.textContent.includes('John Doe')) {
        found = true;
      }
    });
    expect(found).toBe(true);
  });
});
