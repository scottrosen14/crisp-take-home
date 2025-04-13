import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { useFetchOrders } from '../../../hooks/useFetchOrders';
import { mockOrders } from '../../../mocks/mockOrders';

// Mock the useFetchOrders hook
jest.mock('../../../hooks/useFetchOrders');

describe('App Component', () => {
  const mockUseFetchOrders = useFetchOrders as jest.MockedFunction<
    typeof useFetchOrders
  >;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    // Mock the hook to return loading state
    mockUseFetchOrders.mockReturnValue({
      orders: [],
      loading: true,
      error: null,
    });

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const errorMessage = 'Failed to fetch orders';
    // Mock the hook to return error state
    mockUseFetchOrders.mockReturnValue({
      orders: [],
      loading: false,
      error: errorMessage,
    });

    render(<App />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders PivotTable when data is loaded successfully', () => {
    // Mock the hook to return successful data
    mockUseFetchOrders.mockReturnValue({
      orders: mockOrders,
      loading: false,
      error: null,
    });

    render(<App />);
    // Since PivotTable is rendered, we should see the table structure
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
