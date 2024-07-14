import { dateCompare, isMicroSeconds } from '../src/date_compare';
describe('isMicroSeconds', () => {
  it('isMicroSeconds', () => {
    expect(isMicroSeconds(1542123494000)).toEqual(true);
    expect(isMicroSeconds(1542123494632)).toEqual(true);
  });
});
describe('dateCompare', () => {
  it('no throw', () => {
    expect(dateCompare(1542123494000, 1542123494632)).toEqual(true);
    expect(dateCompare(1542123495000, 1542123494632)).toEqual(false);
  });
  it('throw', () => {
    expect(() => dateCompare(1542123494, 1542123494632)).toThrow(new Error('date is not micro sec.'));
  });
});
