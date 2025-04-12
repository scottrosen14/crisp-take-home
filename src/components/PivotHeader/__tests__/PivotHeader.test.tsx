import React from 'react';
import { render, screen } from '@testing-library/react';
import PivotHeader from '../PivotHeader';

describe('PivotHeader', () => {
  const mockStates = ['California', 'New York', 'Texas'];

  it('renders with empty states array', () => {
    render(<PivotHeader states={[]} />);

    expect(screen.getByText('PRODUCTS')).toBeInTheDocument();
    expect(screen.getByText('STATES')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Sub-Category')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('renders with multiple states', () => {
    render(<PivotHeader states={mockStates} />);

    // Check if all states are rendered
    mockStates.forEach(state => {
      expect(screen.getByText(state)).toBeInTheDocument();
    });

    // Check if the basic structure is maintained
    expect(screen.getByText('PRODUCTS')).toBeInTheDocument();
    expect(screen.getByText('STATES')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Sub-Category')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('renders the header structure correctly', () => {
    render(<PivotHeader states={mockStates} />);

    // Check if the thead is present
    const thead = screen.getByRole('rowgroup');
    expect(thead).toBeInTheDocument();

    // Check if both rows are present
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);
  });

  it('renders the PRODUCTS and STATES headers correctly', () => {
    render(<PivotHeader states={mockStates} />);

    // Check first row headers
    expect(screen.getByText('PRODUCTS')).toBeInTheDocument();
    expect(screen.getByText('STATES')).toBeInTheDocument();
  });

  it('renders the column headers correctly', () => {
    render(<PivotHeader states={mockStates} />);

    // Check second row headers
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Sub-Category')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();

    // Check state headers
    mockStates.forEach(state => {
      expect(screen.getByText(state)).toBeInTheDocument();
    });
  });

  it('handles empty states array', () => {
    render(<PivotHeader states={[]} />);

    // Basic structure should still be present
    expect(screen.getByText('PRODUCTS')).toBeInTheDocument();
    expect(screen.getByText('STATES')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Sub-Category')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });
});
