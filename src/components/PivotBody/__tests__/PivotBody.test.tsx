import React from 'react';
import { render, screen } from '@testing-library/react';
import PivotBody from '../PivotBody';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as reduxHooks from '../../../redux/store';

jest.mock('../../../redux/store', () => ({
  ...jest.requireActual('../../../redux/store'),
  useAppSelector: jest.fn(),
}));

describe('PivotBody Component', () => {
  const store = configureStore({
    reducer: {
      orders: () => ({
        uniqueColumns: ['California', 'Florida'],
        pivotRows: { Furniture: {} },
        grandTotals: {
          columnGrandTotals: {},
          ultimateGrandTotal: 0,
        },
      }),
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      columns: ['California', 'Florida'],
      groupedRowData: { Furniture: {} },
      columnGrandTotals: {},
      ultimateGrandTotal: 0,
    });
  });

  it.skip('renders GroupRows component', () => {
    render(
      <Provider store={store}>
        <PivotBody />
      </Provider>
    );
    expect(screen.getByTestId('group-rows')).toBeInTheDocument();
  });

  it.skip('renders GrandTotalRow component', () => {
    render(
      <Provider store={store}>
        <PivotBody />
      </Provider>
    );
    expect(screen.getByTestId('grand-total-row')).toBeInTheDocument();
  });
});
