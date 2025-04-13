import React from 'react';
import { render, screen } from '@testing-library/react';
import PivotBody from '../PivotBody';

describe('PivotBody Component', () => {
  const mockStates = ['California', 'New York'];

  const mockPivotRows = {
    Furniture: {
      Chairs: {
        California: 1000,
        'New York': 2000,
      },
      Tables: {
        California: 1500,
        'New York': 2500,
      },
    },
    'Office Supplies': {
      Paper: {
        California: 500,
        'New York': 1000,
      },
    },
  };

  it('renders with empty data', () => {
    render(<PivotBody pivotRows={{}} usStates={[]} />);
    expect(screen.getByText('Grand Total')).toBeInTheDocument();
  });

  it('renders with mock data', () => {
    render(<PivotBody pivotRows={mockPivotRows} usStates={mockStates} />);

    // Check if categories are rendered
    expect(screen.getByText('Furniture')).toBeInTheDocument();
    expect(screen.getByText('Office Supplies')).toBeInTheDocument();

    // Check if sub-categories are rendered
    expect(screen.getByText('Chairs')).toBeInTheDocument();
    expect(screen.getByText('Tables')).toBeInTheDocument();
    expect(screen.getByText('Paper')).toBeInTheDocument();

    // Better approach: Check for the presence of table cells within their context
    // Find the row containing "Chairs" and check its values
    const chairsRow = screen.getByText('Chairs').closest('tr');
    expect(chairsRow).toBeInTheDocument();
    expect(chairsRow?.textContent).toContain('1,000'); // California value
    expect(chairsRow?.textContent).toContain('2,000'); // New York value

    // Find the row containing "Tables" and check its values
    const tablesRow = screen.getByText('Tables').closest('tr');
    expect(tablesRow).toBeInTheDocument();
    expect(tablesRow?.textContent).toContain('1,500'); // California value
    expect(tablesRow?.textContent).toContain('2,500'); // New York value

    // Find the row containing "Paper" and check its values
    const paperRow = screen.getByText('Paper').closest('tr');
    expect(paperRow).toBeInTheDocument();
    expect(paperRow?.textContent).toContain('500'); // California value
    expect(paperRow?.textContent).toContain('1,000'); // New York value
  });

  it('handles missing values with dash', () => {
    const incompleteData = {
      Furniture: {
        Chairs: {
          California: 1000,
          // New York is missing
        },
      },
    };

    render(<PivotBody pivotRows={incompleteData} usStates={mockStates} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
