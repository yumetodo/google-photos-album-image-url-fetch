import * as GooglePhotosAlbum from '../src/index';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore: Cannot find module '../src/expected.json'. Consider using '--resolveJsonModule' to import module with '.json' extension
import expected from '../src/expected.json';
import { GooglePhotosSharedAlbumURL } from '../src/constant';
describe('test', () => {
  it('fetchImageUrls', async () => {
    const re = await GooglePhotosAlbum.fetchImageUrls(GooglePhotosSharedAlbumURL);
    expect(re).not.toBeNull();
    expect(re).toEqual(expected);
  });
  it('extractAppended', () => {
    const after: GooglePhotosAlbum.ImageInfo[] = expected;
    const before: GooglePhotosAlbum.ImageInfo[] = [];
    const appended: GooglePhotosAlbum.ImageInfo[] = [];
    for (const e of after) {
      if (Math.random() < 0.5) {
        before.push(e);
      } else {
        appended.push(e);
      }
    }
    const re = GooglePhotosAlbum.extractAppended(before, after);
    expect(re).toEqual(appended);
  });
  it('validityVerification', async () => {
    const re: boolean = await GooglePhotosAlbum.validityVerification();
    expect(re).toEqual(true);
  });
});
