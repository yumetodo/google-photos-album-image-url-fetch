import { splitResult } from '../src/split_result';
import { dateCompare } from '../src/date_compare';
import type { ImageInfo } from '../src/imageInfo';
const url1 =
  'https://lh3.googleusercontent.com/Pt3C6874cqkfeuIVL0XZ-UCsC6zLzeQmxq7T9-sDiPhyAgvJiKl_SCrvrMMkpuWuZ1TFkU65ilaZJrCbePRYo1q1qGTYvFV6J8gbYfZhhxQuXm2zXx6QDQkj0K-uBBUzozw7YLYQ5g';
const url2 =
  'https://lh3.googleusercontent.com/pw/AL9nZEV1iNMg-BoRi9GwhhnWNG1SLsFVVhn3xcwh2HaFendlbRJ4DbmEVO9EhQ1SrM4H3zXcbiBYLT9F-e7oyq8I1mrluxlb-00N8dimii_zV7fbE3F080Y';
describe('url: string', () => {
  it('splitResult', () => {
    const input: ImageInfo = {
      albumAddDate: 1564229558506,
      height: 400,
      imageUpdateDate: 1317552314000,
      uid: 'AF1QipO4_Y5pseqWDPSlY7AAo0wmg76xW4gX0kOz8-p_',
      url: url1,
      width: 640,
    };
    const expectedRest = {
      albumAddDate: 1564229558506,
      height: 400,
      uid: 'AF1QipO4_Y5pseqWDPSlY7AAo0wmg76xW4gX0kOz8-p_',
      width: 640,
    };
    const expectedImageUpdateDate = 1317552314000;
    const [actualRest, actualUrls, actualImageUpdateDates] = splitResult([input]);
    expect(actualRest).toStrictEqual([expectedRest]);
    expect(actualUrls).toStrictEqual([url1]);
    expect(dateCompare(actualImageUpdateDates[0], expectedImageUpdateDate));

    // assume shallow copy
    input.height = 500;
    input.imageUpdateDate = 1317552314;
    expect(actualRest[0].height).not.toBe(input.height);
    expect(dateCompare(actualImageUpdateDates[0], expectedImageUpdateDate));
  });
  it('splitResult readonly fail', () => {
    const input: ImageInfo = Object.freeze({
      albumAddDate: 1564229558506,
      height: 400,
      imageUpdateDate: 1317552314000,
      uid: 'AF1QipO4_Y5pseqWDPSlY7AAo0wmg76xW4gX0kOz8-p_',
      url: url1,
      width: 640,
    });
    const expectedRest = {
      albumAddDate: 1564229558506,
      height: 400,
      uid: 'AF1QipO4_Y5pseqWDPSlY7AAo0wmg76xW4gX0kOz8-p_',
      width: 640,
    };
    const expectedImageUpdateDate = 1317552314000;
    const [actualRest, actualUrls, actualImageUpdateDates] = splitResult([input]);
    expect(actualRest).toStrictEqual([expectedRest]);
    expect(actualUrls).toStrictEqual([url1]);
    expect(dateCompare(actualImageUpdateDates[0], expectedImageUpdateDate));
  });
});
describe('url: string[]', () => {
  it('splitResult', () => {
    const input = {
      albumAddDate: 1564229558506,
      height: 400,
      imageUpdateDate: 1317552314000,
      uid: 'AF1QipO4_Y5pseqWDPSlY7AAo0wmg76xW4gX0kOz8-p_',
      url: [url1, url2],
      width: 640,
    };
    const expectedRest = {
      albumAddDate: 1564229558506,
      height: 400,
      uid: 'AF1QipO4_Y5pseqWDPSlY7AAo0wmg76xW4gX0kOz8-p_',
      width: 640,
    };
    const expectedImageUpdateDate = 1317552314000;
    const [actualRest, actualUrls, actualImageUpdateDates] = splitResult([input]);
    expect(actualRest).toStrictEqual([expectedRest]);
    expect(actualUrls).toStrictEqual([[url1, url2]]);
    expect(actualImageUpdateDates.length).toEqual(1);
    expect(dateCompare(actualImageUpdateDates[0], expectedImageUpdateDate));
    // assume shallow copy
    input.height = 500;
    input.imageUpdateDate = 1317552314;
    expect(actualRest[0].height).not.toBe(input.height);
    expect(dateCompare(actualImageUpdateDates[0], expectedImageUpdateDate));
  });
});
