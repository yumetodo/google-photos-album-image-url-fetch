import { GooglePhotos } from '../src/index';
// @ts-ignore
import expected from './expected.json';
describe('test', () => {
  it('test', async () => {
    const re = await GooglePhotos.Album.fetchImageUrls('https://photos.app.goo.gl/QCXy6XaKX5x1AynH8');
    expect(re).not.toBeNull();
    expect(re).toEqual(expected);
  });
});
