import { GooglePhotos } from '../src/index';
// @ts-ignore
import expected from './expected.json';
import { GooglePhotosSharedAlbumURL } from './constant'
describe('test', () => {
  it('test', async () => {
    const re = await GooglePhotos.Album.fetchImageUrls(GooglePhotosSharedAlbumURL);
    expect(re).not.toBeNull();
    expect(re).toEqual(expected);
  });
});
