export interface ImageInfo {
  /**
   * When you have shared album URL that can get via Google Photos API, that shold be like below:
   *
   * `https://photos.app.goo.gl/${shortAlbumUID}`
   *
   * When you access to the URL, it will be redirected. Then, you can get `albumUID` and `key`
   *
   * ```js
   * console.log(await fetch(`https://photos.app.goo.gl/${shortAlbumUID}`).then(r => r.url)); // => https://photos.google.com/share/${albumUID}?key=${key}
   * ```
   * Also, you can get the `uid` that identify the photo you select. The `uid` can get via `GooglePhotos.Album.fetchImageUrls`
   *
   * Now, you can get the URL of the photo page.
   *
   * `https://photos.google.com/share/${albumUID}/photo/${uid}?key=${key}`
   */
  uid: string;
  /** url of image binary */
  url: string;
  width: number;
  height: number;
  /** The epoch time when image was updated */
  imageUpdateDate: number;
  /** The epoch time when image was added to this album */
  albumAddDate: number;
}
