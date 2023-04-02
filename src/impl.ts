import { request } from 'gaxios';
import { ImageInfo } from './imageInfo';
import { AbortSignal } from 'abort-controller';
import { parse } from 'json5';
export async function getSharedAlbumHtml(albumSharedurl: string, signal?: AbortSignal): Promise<string> {
  return request<string>({
    url: albumSharedurl,
    retryConfig: { retry: 4, retryDelay: 1000 },
    retry: true,
    signal: signal,
  }).then(r => r.data);
}
export function parsePhase1(input: string): string | null {
  const re = /(?<=AF_initDataCallback\()(?=.*data)(\{[\s\S]*?)(\);<\/script>)/g;
  return [...input.matchAll(re)].reduce((a, b) => (a.length > b[1].length ? a : b[1]), '');
}
export function parsePhase2(input: string): unknown {
  try {
    return parse(input);
  } catch (_) {
    return null;
  }
}
export interface ContainData {
  data: unknown;
}
export const isContainData = (o: unknown): o is ContainData => typeof o === 'object' && o != null && 'data' in o;
const rawIsArray = Array.isArray;
const isArray = (a: unknown): a is unknown[] => rawIsArray(a);
export function parsePhase3(input: unknown): ImageInfo[] | null {
  if (!isContainData(input)) {
    return null;
  }
  const d = input.data;
  if (!isArray(d) || d.length < 1) {
    return null;
  }
  const arr = d[1];
  if (!isArray(arr)) {
    return null;
  }
  return arr
    .map(e => {
      if (!isArray(e) || e.length < 6) {
        return null;
      }
      const uid = e[0];
      const imageUpdateDate = e[2];
      const albumAddDate = e[5];
      if (typeof uid !== 'string' || typeof imageUpdateDate !== 'number' || typeof albumAddDate !== 'number') {
        return null;
      }
      const detail = e[1];
      if (!isArray(detail) || detail.length < 3) {
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
