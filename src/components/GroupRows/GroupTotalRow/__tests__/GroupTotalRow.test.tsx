import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupTotalRow from '../GroupTotalRow';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

describe('GroupTotalRow Component', () => {
  const mockProps = {
    groupTotalsByColumn: { California: 100, Florida: 200 },
    groupGrandTotal: 300,
    columns: ['California', 'Florida'],
  };

  const store = configureStore({
    reducer: {
      orders: () => ({}),
    },
  });

  it('renders with correct column totals', () => {
    render(
      <Provider store={store}>
        <GroupTotalRow {...mockProps} />
      </Provider>
    );
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('renders with correct group total', () => {
    render(
      <Provider store={store}>
        <GroupTotalRow {...mockProps} />
      </Provider>
    );
    expect(screen.getByText('300')).toBeInTheDocument();
  });
});
