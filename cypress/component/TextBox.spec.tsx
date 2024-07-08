import React from 'react';
import { mount } from 'cypress/react18';
import TextBox from '../../components/elements/TextBox';

describe('TextBox Component', () => {
  it('renders the label correctly', () => {
    mount(<TextBox labelText="Name" />);
    cy.get('label').contains('Name');
  });

  it('handles input changes', () => {
    const handleChange = cy.stub();
    mount(<TextBox onChange={handleChange} />);
    cy.get('input').type('John Doe');
    cy.wrap(handleChange).should('have.been.called');
  });
});
