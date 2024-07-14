import type { ImageInfo } from './imageInfo';
type ImageInfoWithoutUrl = Omit<ImageInfo, 'url'>;
export type ImageInfoLike = ImageInfoWithoutUrl & { url: string | string[] };
export type ImageInfoLikeRest<T extends ImageInfoLike> = Omit<Omit<T, 'url'>, 'imageUpdateDate'>;
type ImageInfoMaybeLackUrl<T extends ImageInfoLike> = ImageInfoLikeRest<T> & {
  url?: T['url'];
  imageUpdateDate?: T['imageUpdateDate'];
};
export function splitResult<T extends ImageInfoLike>(
  input: Readonly<T>[]
): [ImageInfoLikeRest<T>[], T['url'][], T['imageUpdateDate'][]] {
  const urls: T['url'][] = [];
  const imageUpdateDates: T['imageUpdateDate'][] = [];
  const rest = input.map(e => {
    urls.push(e.url);
    imageUpdateDates.push(e.imageUpdateDate);
    const rest: ImageInfoMaybeLackUrl<T> = { ...e };
    delete rest.url;
    delete rest.imageUpdateDate;
    return rest;
  });
  return [rest, urls, imageUpdateDates];
}
