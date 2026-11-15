import { describe, expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

// Each test renders a fresh counter, so the starting value is always zero.
const countHeading = () => screen.getByRole('heading', { level: 1 });
const clickButton = (name: 'Increment' | 'Decrement' | 'Reset') => {
  fireEvent.click(screen.getByRole('button', { name }));
};

describe('Counter application', () => {
  test('TC01: starts at zero and shows all three controls', () => {
    render(<App />);

    expect(countHeading()).toHaveTextContent('Count: 0');
    expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decrement' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  test('TC02: increments the count from zero to one', () => {
    render(<App />);

    clickButton('Increment');
    expect(countHeading()).toHaveTextContent('Count: 1');
  });

  test('TC03: decrements the count from zero to negative one', () => {
    render(<App />);

    clickButton('Decrement');
    expect(countHeading()).toHaveTextContent('Count: -1');
  });

  test('TC04: resets the count after it has changed', () => {
    render(<App />);

    clickButton('Increment');
    clickButton('Increment');
    expect(countHeading()).toHaveTextContent('Count: 2');
    clickButton('Reset');
    expect(countHeading()).toHaveTextContent('Count: 0');
  });

  test('TC05: handles several actions in sequence', () => {
    render(<App />);

    clickButton('Increment');
    clickButton('Increment');
    clickButton('Increment');
    expect(countHeading()).toHaveTextContent('Count: 3');

    clickButton('Decrement');
    expect(countHeading()).toHaveTextContent('Count: 2');

    clickButton('Reset');
    expect(countHeading()).toHaveTextContent('Count: 0');

    clickButton('Decrement');
    expect(countHeading()).toHaveTextContent('Count: -1');

    clickButton('Increment');
    expect(countHeading()).toHaveTextContent('Count: 0');
  });

  test('TC06: reset keeps the count at zero when it is already zero', () => {
    render(<App />);

    clickButton('Reset');
    expect(countHeading()).toHaveTextContent('Count: 0');
  });
});
