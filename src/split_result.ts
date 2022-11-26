import type { ImageInfo } from './imageInfo';
type ImageInfoWithoutUrl = Omit<ImageInfo, 'url'>;
export type ImageInfoLike = ImageInfoWithoutUrl & { url: string | string[] };
export type ImageInfoLikeWithoutUrl<T extends ImageInfoLike> = Omit<T, 'url'>;
type ImageInfoMaybeLackUrl<T extends ImageInfoLike> = ImageInfoLikeWithoutUrl<T> & { url?: T['url'] };
export function splitResult<T extends ImageInfoLike>(input: T[]): [ImageInfoLikeWithoutUrl<T>[], T['url'][]] {
  const urls:T['url'][] = [];
  const rest = input.map(e => {
    urls.push(e.url);
    const rest: ImageInfoMaybeLackUrl<T> = e;
    delete rest.url;
    return rest;
  });
  return [rest, urls];
}
