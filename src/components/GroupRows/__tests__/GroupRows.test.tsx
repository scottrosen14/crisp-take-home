import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupRows from '../GroupRows';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as reduxHooks from '../../../redux/store';

jest.mock('../../../redux/store', () => ({
  ...jest.requireActual('../../../redux/store'),
  useAppSelector: jest.fn(),
}));

describe('GroupRows Component', () => {
  const mockProps = {
    groupName: 'Furniture',
    subGroups: {},
    columns: ['California', 'Florida'],
  };

  const store = configureStore({
    reducer: {
      orders: () => ({
        groupTotals: {
          groupedTotalsByColumn: {},
          groupGrandTotal: 0,
        },
      }),
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      groupedTotalsByColumn: {},
      groupGrandTotal: 0,
    });
  });

  it('renders GroupMetricRows component', () => {
    render(
      <Provider store={store}>
        <GroupRows {...mockProps} />
      </Provider>
    );
    expect(screen.getByTestId('group-metric-rows')).toBeInTheDocument();
  });

  it('renders GroupTotalRow component', () => {
    render(
      <Provider store={store}>
        <GroupRows {...mockProps} />
      </Provider>
    );
    expect(screen.getByTestId('group-total-row')).toBeInTheDocument();
  });
});
