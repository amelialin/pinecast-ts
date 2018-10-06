import {addDays, endOfDay, startOfDay} from './dates';

const TS = '2018-10-06T16:09:08.658Z';

describe('startOfDay', () => {
  it('should pin a date to the start of the day', () => {
    const original = new Date(TS);
    const result = startOfDay(original);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
  it('should not mutate the date', () => {
    const original = new Date();
    expect(startOfDay(original)).not.toBe(original);
  });
});

describe('endOfDay', () => {
  it('should pin a date to the end of the day', () => {
    const original = new Date(TS);
    const result = endOfDay(original);
    expect(result.getDate()).toBe(original.getDate());
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });
  it('should not mutate the date', () => {
    const original = new Date();
    expect(endOfDay(original)).not.toBe(original);
  });
});

describe('addDays', () => {
  it('should add days', () => {
    const original = new Date(TS);
    const result = addDays(original, 2);
    expect(result.getHours()).toBe(original.getHours());
    expect(result.getMinutes()).toBe(original.getMinutes());
    expect(result.getSeconds()).toBe(original.getSeconds());
    expect(result.getMilliseconds()).toBe(original.getMilliseconds());

    const updated = new Date(original);
    updated.setDate(original.getDate() + 2);
    expect(result.getDate()).toBe(updated.getDate());
  });
  it('should not mutate the date', () => {
    const original = new Date();
    expect(addDays(original, 2)).not.toBe(original);
  });
});
