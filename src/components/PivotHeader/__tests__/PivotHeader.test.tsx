import React from 'react';
import { render, screen } from '@testing-library/react';
import PivotHeader from '../PivotHeader';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as reduxHooks from '../../../redux/store';

jest.mock('../../../redux/store', () => ({
  ...jest.requireActual('../../../redux/store'),
  useAppSelector: jest.fn(),
}));

describe('PivotHeader Component', () => {
  const store = configureStore({
    reducer: {
      orders: () => ({
        uniqueColumns: ['California', 'Florida'],
        pivotRows: {},
        grandTotals: {},
      }),
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      uniqueColumns: ['California', 'Florida'],
      pivotRows: {},
      grandTotals: {},
    });
  });

  it('renders TopHeaderRow component', () => {
    render(
      <Provider store={store}>
        <PivotHeader />
      </Provider>
    );
    expect(screen.getByTestId('top-header-row')).toBeInTheDocument();
  });

  it('renders SubHeaderRow component', () => {
    render(
      <Provider store={store}>
        <PivotHeader />
      </Provider>
    );
    expect(screen.getByTestId('sub-header-row')).toBeInTheDocument();
  });
});
