import React from 'react';
import { render, screen } from '@testing-library/react';
import GrandTotalRow from '../GrandTotalRow';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as reduxHooks from '../../redux/store';

jest.mock('../../redux/store', () => ({
  ...jest.requireActual('../../redux/store'),
  useAppSelector: jest.fn(),
}));

describe('GrandTotalRow Component', () => {
  const mockProps = {
    columnGrandTotals: { California: 100, Florida: 200 },
    ultimateGrandTotal: 300,
  };

  const store = configureStore({
    reducer: {
      orders: () => ({
        uniqueColumns: ['California', 'Florida'],
      }),
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue([
      'California',
      'Florida',
    ]);
  });

  it('renders with correct column totals', () => {
    render(
      <Provider store={store}>
        <GrandTotalRow {...mockProps} />
      </Provider>
    );
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('renders with correct ultimate total', () => {
    render(
      <Provider store={store}>
        <GrandTotalRow {...mockProps} />
      </Provider>
    );
    expect(screen.getByText('300')).toBeInTheDocument();
  });
});
