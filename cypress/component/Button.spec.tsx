import React from 'react';
import { mount } from 'cypress/react18';
import Button from '../../components/elements/Button';

describe('Button Component', () => {
  it('renders the button with the correct text', () => {
    mount(<Button variant="primary">Click Me</Button>);
    cy.get('button').contains('Click Me');
  });

  it('applies the correct variant class', () => {
    mount(<Button variant="danger">Delete</Button>);
    cy.get('button').should('have.class', 'bg-red-500');
  });
});
