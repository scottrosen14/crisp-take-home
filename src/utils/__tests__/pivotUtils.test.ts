import {
  calculateGrandTotals,
  getUniqueColumns,
  groupPivotRowData,
} from '../pivotUtils';
import { mockOrders } from '../../mocks/mockOrders';

describe('pivotUtils', () => {
  describe('getUniqueColumns', () => {
    it('should handle empty data', () => {
      const result = getUniqueColumns([], 'state');
      expect(result).toEqual([]);
    });

    it('should return unique states sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders, 'state');
      expect(result).toEqual(['California', 'Florida', 'Kentucky']);
    });

    it('should return unique categories sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders, 'category');
      expect(result).toEqual(['Furniture', 'Office Supplies', 'Technology']);
    });

    it('should return unique segments sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders, 'segment');
      expect(result).toEqual(['Consumer', 'Corporate']);
    });

    it('should return unique ship modes sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders, 'shipMode');
      expect(result).toEqual(['Second Class', 'Standard Class']);
    });

    it('should return unique regions sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders, 'region');
      expect(result).toEqual(['South', 'West']);
    });

    it('should handle columns with all the same values', () => {
      const result = getUniqueColumns(mockOrders, 'country');
      expect(result).toEqual(['United States']);
    });

    it('should return empty array for non-existent columns', () => {
      const result = getUniqueColumns(mockOrders, 'nonExistentColumn');
      expect(result).toEqual([]);
    });
  });

  describe('groupPivotRowData', () => {
    it('should handle empty data', () => {
      const result = groupPivotRowData([], 'state', [
        'category',
        'subcategory',
      ]);
      expect(result).toEqual({});
    });

    it('should group data correctly by category, subcategory, and state', () => {
      const groupedRows = groupPivotRowData(mockOrders, 'state', [
        'category',
        'subcategory',
      ]);

      expect(groupedRows).toEqual({
        Furniture: {
          Bookcases: { Kentucky: 261.96 },
          Chairs: { Kentucky: 731.94 },
          Tables: { Florida: 957.5775 },
          Furnishings: { California: 48.86 },
        },
        'Office Supplies': {
          Labels: { California: 14.62 },
          Storage: { Florida: 22.368 },
          Art: { California: 7.28 },
          Binders: { California: 18.504 },
          Appliances: { California: 114.9 },
        },
        Technology: { Phones: { California: 907.152 } },
      });
    });

    it('should group data correctly by country, region, and segment', () => {
      const groupedRows = groupPivotRowData(mockOrders, 'segment', [
        'country',
        'region',
      ]);

      expect(groupedRows).toEqual({
        'United States': {
          South: {
            Consumer: 1973.4555,
            Corporate: 0,
          },
          West: {
            Consumer: 1096.696,
            Corporate: 14.62,
          },
        },
      });
    });

    it('should group data correctly by category with segment and region', () => {
      const groupedRows = groupPivotRowData(mockOrders, 'category', [
        'segment',
        'region',
      ]);

      expect(groupedRows).toEqual({
        Consumer: {
          South: {
            Furniture: 1951.4775,
            'Office Supplies': 22.368,
          },
          West: {
            Furniture: 48.86,
            'Office Supplies': 160.204,
            Technology: 907.152,
          },
        },
        Corporate: {
          West: {
            'Office Supplies': 14.62,
          },
        },
      });
    });

    it('should group data correctly by shipMode with country and state', () => {
      const groupedRows = groupPivotRowData(mockOrders, 'shipMode', [
        'country',
        'state',
      ]);

      expect(groupedRows).toEqual({
        'United States': {
          Kentucky: {
            'Second Class': 993.9,
          },
          California: {
            'Second Class': 14.62,
            'Standard Class': 1096.696,
          },
          Florida: {
            'Standard Class': 979.9455,
          },
        },
      });
    });

    it('should group data correctly by subCategory with segment and shipMode', () => {
      const groupedRows = groupPivotRowData(mockOrders, 'subCategory', [
        'segment',
        'shipMode',
      ]);

      expect(groupedRows).toEqual({
        Consumer: {
          'Second Class': {
            Bookcases: 261.96,
            Chairs: 731.94,
          },
          'Standard Class': {
            Tables: 957.5775,
            Storage: 22.368,
            Furnishings: 48.86,
            Art: 7.28,
            Binders: 18.504,
            Appliances: 114.9,
            Phones: 907.152,
          },
        },
        Corporate: {
          'Second Class': {
            Labels: 14.62,
          },
        },
      });
    });
  });

  describe('calculateGrandTotals', () => {
    it('should handle empty data', () => {
      const { columnGrandTotals, ultimateGrandTotal } = calculateGrandTotals(
        {},
        []
      );
      expect(columnGrandTotals).toEqual({});
      expect(ultimateGrandTotal).toEqual(0);
    });

    it('should calculate totals for state-based grouping', () => {
      const groupedRows = {
        Furniture: {
          Bookcases: { Kentucky: 261.96 },
          Chairs: { Kentucky: 731.94 },
          Tables: { Florida: 957.5775 },
          Furnishings: { California: 48.86 },
        },
        'Office Supplies': {
          Labels: { California: 14.62 },
          Storage: { Florida: 22.368 },
          Art: { California: 7.28 },
          Binders: { California: 18.504 },
          Appliances: { California: 114.9 },
        },
        Technology: { Phones: { California: 907.152 } },
      };

      const { columnGrandTotals, ultimateGrandTotal } = calculateGrandTotals(
        groupedRows,
        ['California', 'Florida', 'Kentucky']
      );

      expect(columnGrandTotals).toEqual({
        California: 1096.696,
        Florida: 979.9455,
        Kentucky: 993.9,
      });
      expect(ultimateGrandTotal).toEqual(3070.5415);
    });

    it('should calculate totals for segment-based grouping', () => {
      const groupedRows = {
        'United States': {
          South: {
            Consumer: 1973.4555,
            Corporate: 0,
          },
          West: {
            Consumer: 1096.696,
            Corporate: 14.62,
          },
        },
      };

      const { columnGrandTotals, ultimateGrandTotal } = calculateGrandTotals(
        groupedRows,
        ['Consumer', 'Corporate']
      );

      expect(columnGrandTotals).toEqual({
        Consumer: 3070.1515,
        Corporate: 14.62,
      });
      expect(ultimateGrandTotal).toEqual(3084.7715);
    });

    it('should handle missing values in columns', () => {
      const groupedRows = {
        Category1: {
          Sub1: { Column1: 100, Column2: 200 },
          Sub2: { Column1: 300 },
        },
        Category2: {
          Sub3: { Column2: 400 },
        },
      };

      const { columnGrandTotals, ultimateGrandTotal } = calculateGrandTotals(
        groupedRows,
        ['Column1', 'Column2']
      );

      expect(columnGrandTotals).toEqual({
        Column1: 400,
        Column2: 600,
      });
      expect(ultimateGrandTotal).toEqual(1000);
    });

    it('should handle decimal precision correctly', () => {
      const groupedRows = {
        Category1: {
          Sub1: { Column1: 100.123, Column2: 200.456 },
          Sub2: { Column1: 300.789 },
        },
      };

      const { columnGrandTotals, ultimateGrandTotal } = calculateGrandTotals(
        groupedRows,
        ['Column1', 'Column2']
      );

      expect(columnGrandTotals).toEqual({
        Column1: 400.912,
        Column2: 200.456,
      });
      expect(ultimateGrandTotal).toEqual(601.368);
    });
  });
});
