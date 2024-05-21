// eslint-disable-next-line @typescript-eslint/naming-convention
import * as GooglePhotosAlbum from '../src/index';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Cannot find module '../src/expected.json'. Consider using '--resolveJsonModule' to import module with '.json' extension
import expected from '../src/expected.json';
import { googlePhotosSharedAlbumURL } from '../src/constant';
import { splitResult, ImageInfoLike } from '../src/split_result';
describe('test', () => {
  it('fetchImageUrls', async () => {
    const re = await GooglePhotosAlbum.fetchImageUrls(googlePhotosSharedAlbumURL);
    expect(re).not.toBeNull();
    if (re == null) return;
    const [actualRest, actualUrls] = splitResult(re);
    const [expectedRest, expectedAnyUrls] = splitResult(expected);
    expect(actualRest).toEqual(expectedRest);
    for (let i = 0; i < actualUrls.length; i++) {
      const actualUrl = actualUrls[i];
      const expectedAnyUrl = expectedAnyUrls[i];
      expect(expectedAnyUrl).toContain(actualUrl);
    }
  });
  it('extractAppended', () => {
    const after: GooglePhotosAlbum.ImageInfo[] = expected.map((e: ImageInfoLike) => {
      const ret = { ...e };
      ret.url = e.url[0];
      return ret as GooglePhotosAlbum.ImageInfo;
    });
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
