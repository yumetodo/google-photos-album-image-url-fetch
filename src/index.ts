import { request } from 'gaxios';
import { getSharedAlbumHtml, parsePhase1, parsePhase2, parsePhase3 } from './impl';
import { ImageInfo as info } from './imageInfo';
export namespace GooglePhotos {
  export namespace Album {
    export type ImageInfo = info;
    export async function fetchImageUrls(albumSharedurl: string) {
      const html = await getSharedAlbumHtml(albumSharedurl);
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
  }
}
