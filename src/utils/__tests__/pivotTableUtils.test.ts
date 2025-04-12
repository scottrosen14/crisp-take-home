import {
  calculateUltimateTotal,
  getUniqueStates,
  groupDataForPivot,
} from '../pivotUtils';
import { mockOrders } from '../../mocks/mockOrders';

describe('pivotUtils', () => {
  describe('getUniqueStates', () => {
    it('should return unique states sorted alphabetically', () => {
      const result = getUniqueStates(mockOrders);
      expect(result).toEqual(['CA', 'NY']);
    });

    it('should handle empty data', () => {
      const result = getUniqueStates([]);
      expect(result).toEqual([]);
    });
  });
  describe('groupDataForPivot', () => {
    it('should group data correctly by category, subcategory, and state', () => {
      const result = groupDataForPivot(mockOrders);

      expect(result).toEqual({
        Electronics: {
          Phones: {
            CA: 100,
            NY: 200,
          },
          Laptops: {
            CA: 300,
          },
        },
        Clothing: {
          Shirts: {
            NY: 150,
          },
        },
      });
    });

    it('should handle empty data', () => {
      const result = groupDataForPivot([]);
      expect(result).toEqual({});
    });
  });
  describe('ultimateGrandTotal', () => {
    const mockUltimateGrandTotal = 1125711.76;
    const total = calculateUltimateTotal();
    expect(total).toEqual(mockUltimateGrandTotal);
  });
});
