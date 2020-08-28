import { getSharedAlbumHtml, parsePhase1, parsePhase2, parsePhase3, isContainData } from '../src/impl';
import { ImageInfo } from '../src/imageInfo';
import { googlePhotosSharedAlbumURL } from '../src/constant';
describe('impl', () => {
  it('impl', async () => {
    const html = await getSharedAlbumHtml(googlePhotosSharedAlbumURL);
    expect(html.length).not.toBeUndefined();
    expect(10 < html.length).toBe(true);
    // parsePhase1
    const ph1 = parsePhase1(html);
    expect(ph1).not.toBeNull();
    // parsePhase2
    const ph2 = parsePhase2(ph1 as string);
    if (!isContainData(ph2)) {
      throw new Error('missing data propaty');
    }
    const ph2Data = ph2.data;
    expect(Array.isArray(ph2Data)).toBe(true);
    const ph2DataChecked = ph2Data as unknown[];
    expect(1 < ph2DataChecked.length).toBe(true);
    expect(Array.isArray(ph2DataChecked[1])).toBe(true);
    const ph2DataCheckedElementChecked = ph2DataChecked[1] as unknown[];
    expect(1 < ph2DataCheckedElementChecked.length).toBe(true);
    // parsePhase3
    const ph3 = parsePhase3(ph2);
    expect(Array.isArray(ph3)).toBe(true);
    const ph3Checked = ph3 as ImageInfo[];
    expect(ph3Checked.length).not.toBe(0);
  });
});
