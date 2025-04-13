import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as reduxHooks from '../../../redux/store';
import { mockOrders } from '../../../mocks/mockOrders';

// Mock the store hooks
jest.mock('../../../redux/store', () => ({
  ...jest.requireActual('../../../redux/store'),
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock the thunk dispatch
const mockDispatch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (reduxHooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('renders loading state correctly', () => {
    // Mock the selector to return loading state
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      orders: [],
      loading: true,
      error: null,
    });

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const errorMessage = 'Failed to fetch orders';
    // Mock the selector to return error state
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      orders: [],
      loading: false,
      error: errorMessage,
    });

    render(<App />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders PivotTable when data is loaded successfully', () => {
    // Mock the selector to return successful data
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      orders: mockOrders,
      loading: false,
      error: null,
    });

    render(<App />);
    // Since PivotTable is rendered, we should see the table structure
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
