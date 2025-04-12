import React from 'react';
import { render } from '@testing-library/react';
import PivotTable from './PivotTable';
import PivotBody from '../PivotTableBody/PivotBody';
import { Order } from '../../constants';

describe('PivotTable', () => {
  const mockOrders: Order[] = [
    {
      rowId: 1,
      orderId: '1',
      orderDate: '2024-01-01',
      shipDate: '2024-01-02',
      shipMode: 'Standard',
      customerId: 'C1',
      customerName: 'Customer 1',
      segment: 'Corporate',
      country: 'USA',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: 90001,
      region: 'West',
      productId: 'P1',
      category: 'Furniture',
      subCategory: 'Chairs',
      productName: 'Office Chair',
      sales: 100,
      quantity: 1,
      discount: 0,
      profit: 20,
    },
    {
      rowId: 2,
      orderId: '2',
      orderDate: '2024-01-02',
      shipDate: '2024-01-03',
      shipMode: 'Standard',
      customerId: 'C2',
      customerName: 'Customer 2',
      segment: 'Corporate',
      country: 'USA',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: 90001,
      region: 'West',
      productId: 'P2',
      category: 'Furniture',
      subCategory: 'Tables',
      productName: 'Coffee Table',
      sales: 200,
      quantity: 1,
      discount: 0,
      profit: 40,
    },
    {
      rowId: 3,
      orderId: '3',
      orderDate: '2024-01-03',
      shipDate: '2024-01-04',
      shipMode: 'Standard',
      customerId: 'C3',
      customerName: 'Customer 3',
      segment: 'Corporate',
      country: 'USA',
      city: 'New York',
      state: 'NY',
      postalCode: 10001,
      region: 'East',
      productId: 'P3',
      category: 'Furniture',
      subCategory: 'Chairs',
      productName: 'Dining Chair',
      sales: 150,
      quantity: 1,
      discount: 0,
      profit: 30,
    },
    {
      rowId: 4,
      orderId: '4',
      orderDate: '2024-01-04',
      shipDate: '2024-01-05',
      shipMode: 'Standard',
      customerId: 'C4',
      customerName: 'Customer 4',
      segment: 'Corporate',
      country: 'USA',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: 90001,
      region: 'West',
      productId: 'P4',
      category: 'Office Supplies',
      subCategory: 'Paper',
      productName: 'Copy Paper',
      sales: 50,
      quantity: 1,
      discount: 0,
      profit: 10,
    },
  ];

  it('correctly transforms data into pivotRows structure', () => {
    const { container } = render(<PivotTable data={mockOrders} />);

    // The pivotRows should be structured as:
    // {
    //   'Furniture': {
    //     'Chairs': { 'CA': 100, 'NY': 150 },
    //     'Tables': { 'CA': 200 }
    //   },
    //   'Office Supplies': {
    //     'Paper': { 'CA': 50 }
    //   }
    // }

    // We can verify this by checking the rendered table cells
    const cells = container.querySelectorAll('td');
    expect(cells.length).toBeGreaterThan(0);

    // Check for category cells
    const furnitureCell = Array.from(cells).find(cell => cell.textContent === 'Furniture');
    const officeSuppliesCell = Array.from(cells).find(
      cell => cell.textContent === 'Office Supplies'
    );
    expect(furnitureCell).toBeTruthy();
    expect(officeSuppliesCell).toBeTruthy();
  });

  it('correctly calculates state totals', () => {
    const states = ['CA', 'NY'];
    const pivotRows = {
      Furniture: {
        Chairs: { CA: 100, NY: 150 },
        Tables: { CA: 200 },
      },
      'Office Supplies': {
        Paper: { CA: 50 },
      },
    };

    const { container } = render(<PivotBody pivotRows={pivotRows} states={states} />);

    // Check category totals
    const categoryTotalCells = Array.from(container.querySelectorAll('td')).filter(
      cell => cell.textContent === 'Total'
    );
    expect(categoryTotalCells.length).toBe(2); // One for each category

    // Check grand total
    const grandTotalCell = Array.from(container.querySelectorAll('td')).find(
      cell => cell.textContent === 'Grand Total'
    );
    expect(grandTotalCell).toBeTruthy();

    // Verify the totals are correct
    // Furniture total for CA should be 300 (100 + 200)
    // Furniture total for NY should be 150
    // Office Supplies total for CA should be 50
    // Grand total for CA should be 350 (300 + 50)
    // Grand total for NY should be 150
    const totalValues = Array.from(container.querySelectorAll('td'))
      .filter(cell => cell.textContent && !isNaN(Number(cell.textContent.replace(/,/g, ''))))
      .map(cell => Number(cell.textContent?.replace(/,/g, '') || '0'));

    expect(totalValues).toContain(300); // Furniture CA total
    expect(totalValues).toContain(150); // Furniture NY total
    expect(totalValues).toContain(50); // Office Supplies CA total
    expect(totalValues).toContain(350); // Grand total CA
    expect(totalValues).toContain(150); // Grand total NY
  });

  it('handles empty data correctly', () => {
    const { container } = render(<PivotTable data={[]} />);
    const cells = container.querySelectorAll('td');
    expect(cells.length).toBe(0);
  });

  it('handles missing state values correctly', () => {
    const states = ['CA', 'NY', 'TX'];
    const pivotRows = {
      Furniture: {
        Chairs: { CA: 100, NY: 150 },
        Tables: { CA: 200 },
      },
    };

    const { container } = render(<PivotBody pivotRows={pivotRows} states={states} />);

    // Check that TX column shows '-' for missing values
    const cells = Array.from(container.querySelectorAll('td'));
    const txCells = cells.filter(cell => cell.textContent === '-');
    expect(txCells.length).toBeGreaterThan(0);
  });
});
