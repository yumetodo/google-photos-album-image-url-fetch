import { AbortSignal } from 'abort-controller';
import equal from 'fast-deep-equal';
import { getSharedAlbumHtml, parsePhase1, parsePhase2, parsePhase3 } from './impl';
import { ImageInfo as info } from './imageInfo';
export namespace GooglePhotos {
  export namespace Album {
    export type ImageInfo = info;
    export async function fetchImageUrls(albumSharedurl: string, signal?: AbortSignal) {
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
    export function extractAppended(before: ImageInfo[], after: ImageInfo[]) {
      return after.filter(a => typeof before.find(v => equal(v, a)) === 'undefined');
    }
  }
}
