import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from '../app/page';
import '@testing-library/jest-dom/extend-expect';
const { expect, describe, it } = require('@jest/globals');
describe('SignIn Page', () => {
  it('renders the sign-in form', () => {
    render(<SignIn />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('handles sign-in correctly', () => {
    render(<SignIn />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signInButton);

    // Add more assertions based on the expected behavior after sign-in
  });
});
