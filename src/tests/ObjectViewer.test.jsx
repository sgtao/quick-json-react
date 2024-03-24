import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import ObjectViewer from '@/components/ObjectViewer';

describe('Show test in ObjectViewer', () => {
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

// describe('Edit test in ObjectViewer', () => {
//   test('ObjectViewer updates value on input change', async () => {
//     // Arrange
//     const obj = {};
//     const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

//     // Act
//     render(<ObjectViewer obj={obj} />);
//     // ObjectViewer.onChangeEditor('{"newKey":"newValue"}');
//     // const editorLine = screen.findByText('.cm-line');
//     const editorLine = screen.findByRole('textbox');
//     // const editorLine = screen.findByText('{}');
//     // await userEvent.click(editorLine);
//     // await userEvent.dblClick(editorLine);
//     await userEvent.type(editorLine, '{"newKey":"newValue"}');

//     // Assert
//     expect(consoleLogSpy).toHaveBeenCalledWith('valid JSON format');

//     // clean up
//     consoleLogSpy.mockRestore();
//   });
// });
