export interface ImageInfo {
  /** url of image */
  url: string;
  width: number;
  height: number;
  /** The epoch time when image was updated */
  imageUpdateDate: number;
  /** The epoch time when image was added to this album */
  albumAddDate: number;
}
