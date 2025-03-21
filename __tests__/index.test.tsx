import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home Page', () => {

  const { expect, describe, it } = require('@jest/globals');

  it('renders the heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /welcome to next\.js!/i });
    expect(heading).toBeInTheDocument();
  });
});
