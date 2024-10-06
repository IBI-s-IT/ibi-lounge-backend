import { getRaspDate } from './date.js';

describe('shared', () => {
  it('should do dates', () => {
    expect(getRaspDate(new Date('2024-01-31T21:00:00.000Z'))).toEqual(
      '31.01.2024'
    );
  });
});
