import React from 'react';
import { render, screen } from '@testing-library/react';
import PivotTable from '../PivotTable';
import { mockOrders } from '../../../__mocks__/mockOrders';

jest.mock('../../PivotHeader/PivotHeader', () => () => <thead data-testid="pivot-header">PivotHeader</thead>);
jest.mock('../../PivotBody/PivotBody', () => () => <tbody data-testid="pivot-body">PivotBody</tbody>);

describe('PivotTable Component', () => {
  it('renders table structure correctly', () => {
    render(<PivotTable data={mockOrders} />);
    
    // Check if the table and its basic structure are rendered
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('table')).toHaveStyle({
      borderCollapse: 'collapse',
      width: '100%',
      fontFamily: 'Arial, sans-serif'
    });
  });

  it('renders with empty data', () => {
    render(<PivotTable data={[]} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders with multiple states', () => {
    const multiStateOrders = [
      ...mockOrders,
      {
        ...mockOrders[0],
        state: 'New York',
        rowId: 3
      }
    ];
    
    render(<PivotTable data={multiStateOrders} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders child components', () => {
    render(<PivotTable data={mockOrders} />);
    
    // Check if child components are rendered
    expect(screen.getByTestId('pivot-header')).toBeInTheDocument();
    expect(screen.getByTestId('pivot-body')).toBeInTheDocument();
  });
}); 