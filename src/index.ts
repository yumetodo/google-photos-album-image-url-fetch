import { AbortSignal } from 'abort-controller';
import equal from 'fast-deep-equal';
import { getSharedAlbumHtml, parsePhase1, parsePhase2, parsePhase3 } from './impl';
import { ImageInfo as info } from './imageInfo';
import expected from './expected.json';
import { googlePhotosSharedAlbumURL } from './constant';

export type ImageInfo = info;
export async function fetchImageUrls(albumSharedurl: string, signal?: AbortSignal): Promise<info[] | null> {
  const html = await getSharedAlbumHtml(albumSharedurl, signal);
  const ph1 = parsePhase1(html);
  if (null === ph1) {
    return null;
  }
  const ph2 = parsePhase2(ph1);
  if (null === ph2) {
    return null;
  }
  return parsePhase3(ph2);
}
export function extractAppended(before: ImageInfo[], after: ImageInfo[]): info[] {
  return after.filter(a => typeof before.find(v => equal(v, a)) === 'undefined');
}
export async function validityVerification(): Promise<boolean> {
  const re = await fetchImageUrls(googlePhotosSharedAlbumURL);
  if (null === re) {
    return false;
  }
  return equal(re, expected);
}
