import { request } from 'gaxios';
import { ImageInfo } from './imageInfo';
import { AbortSignal } from 'abort-controller';
export async function getSharedAlbumHtml(albumSharedurl: string, signal?: AbortSignal) {
  return request<string>({
    url: albumSharedurl,
    retryConfig: { retry: 4, retryDelay: 1000 },
    retry: true,
    signal: signal,
  }).then(r => r.data);
}
export function parsePhase1(input: string) {
  const re = /<script nonce="[^"]+">AF_initDataCallback.+data\s*:\s*function\s*\(\s*\)\s*{\s*return\s*([^<]+)\s*}\s*}\s*\)\s*;\s*<\/script>/g;
  const s = re.exec(input);
  if (null === s || s.length !== 2) {
    return null;
  }
  return s[1];
}
export function parsePhase2(input: string) {
  try {
    return JSON.parse(input);
  } catch (_) {
    return null;
  }
}
export function parsePhase3(input: any) {
  if (!Array.isArray(input) || input.length < 1) {
    return null;
  }
  const arr = input[1];
  if (!Array.isArray(arr)) {
    return null;
  }
  return arr
    .map((e): ImageInfo | null => {
      if (!Array.isArray(e) || e.length < 6) {
        return null;
      }
      const uid = e[0];
      const imageUpdateDate = e[2];
      const albumAddDate = e[5];
      if (typeof uid !== 'string' || typeof imageUpdateDate !== 'number' || typeof albumAddDate !== 'number') {
        return null;
      }
      const detail = e[1];
      if (!Array.isArray(detail) || detail.length < 3) {
        return null;
      }
      const url = detail[0];
      const width = detail[1];
      const height = detail[2];
      if (typeof url !== 'string' || typeof width !== 'number' || typeof height !== 'number') {
        return null;
      }
      return {
        uid: uid,
        url: url,
        width: width,
        height: height,
        imageUpdateDate: imageUpdateDate,
        albumAddDate: albumAddDate,
      };
    })
    .filter((e: ImageInfo | null): e is ImageInfo => !(null === e));
}
