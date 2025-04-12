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

    // Check if values are rendered
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('2,000')).toBeInTheDocument();
    expect(screen.getByText('1,500')).toBeInTheDocument();
    expect(screen.getByText('2,500')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  it('calculates totals correctly', () => {
    render(<PivotBody pivotRows={mockPivotRows} usStates={mockStates} />);

    // Check category totals
    expect(screen.getByText('3,000')).toBeInTheDocument(); // Furniture total for California
    expect(screen.getByText('4,500')).toBeInTheDocument(); // Furniture total for New York

    // Check grand totals
    expect(screen.getByText('3,500')).toBeInTheDocument(); // Grand total for California
    expect(screen.getByText('5,500')).toBeInTheDocument(); // Grand total for New York
    expect(screen.getByText('9,000')).toBeInTheDocument(); // Overall grand total
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
