import { getUniqueStates, groupDataForPivot } from '../pivotTableUtils';
import { mockOrders } from '../../mocks/mockOrders';

describe('pivotTableUtils', () => {
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
});
