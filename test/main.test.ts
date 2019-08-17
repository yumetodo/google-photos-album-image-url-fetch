import { GooglePhotos } from '../src/index';
// @ts-ignore
import expected from './expected.json';
import { GooglePhotosSharedAlbumURL } from './constant'
describe('test', () => {
  it('fetchImageUrls', async () => {
    const re = await GooglePhotos.Album.fetchImageUrls(GooglePhotosSharedAlbumURL);
    expect(re).not.toBeNull();
    expect(re).toEqual(expected);
  });
  it('extractAppended', () => {
    const after: GooglePhotos.Album.ImageInfo[] = expected;
    const before: GooglePhotos.Album.ImageInfo[] = [];
    const appended: GooglePhotos.Album.ImageInfo[] = [];
    for (const e of after) {
      if (Math.random() < 0.5) {
        before.push(e);
      } else {
        appended.push(e);
      }
    }
    const re = GooglePhotos.Album.extractAppended(before, after);
    expect(re).toEqual(appended);
  });
});
