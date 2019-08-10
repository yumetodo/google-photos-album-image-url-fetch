import { getSharedAlbumHtml, parsePhase1, parsePhase2, parsePhase3 } from '../src/impl';
import { ImageInfo } from '../src/imageInfo';
describe('impl', () => {
  it('impl', async () => {
    //'https://photos.app.goo.gl/QCXy6XaKX5x1AynH8'
    const html = await getSharedAlbumHtml('https://photos.app.goo.gl/QCXy6XaKX5x1AynH8');
    expect(html.length).not.toBeUndefined();
    expect(10 < html.length).toBe(true);
    // parsePhase1
    const ph1 = parsePhase1(html);
    expect(ph1).not.toBeNull();
    // parsePhase2
    const ph2 = parsePhase2(ph1 as string);
    expect(Array.isArray(ph2)).toBe(true);
    const ph2Checked = ph2 as any[];
    expect(1 < ph2Checked.length).toBe(true);
    expect(Array.isArray(ph2Checked[1])).toBe(true);
    const ph2CheckedElementChecked = ph2Checked[1] as any[];
    expect(1 < ph2CheckedElementChecked.length).toBe(true);
    // parsePhase3
    const ph3 = parsePhase3(ph2);
    expect(Array.isArray(ph3)).toBe(true);
    const ph3Checked = ph3 as ImageInfo[];
    expect(ph3Checked.length).not.toBe(0);
    console.log(JSON.stringify(ph3));
  });
});
