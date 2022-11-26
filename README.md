# google-photos-album-image-url-fetch

[![Node CI](https://github.com/yumetodo/google-photos-album-image-url-fetch/actions/workflows/test.yml/badge.svg)](https://github.com/yumetodo/google-photos-album-image-url-fetch/actions/workflows/test.yml)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fyumetodo%2Fgoogle-photos-album-image-url-fetch.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fyumetodo%2Fgoogle-photos-album-image-url-fetch?ref=badge_shield)

## `GooglePhotosAlbum.fetchImageUrls`

extract public image url from shared album url

You can also use [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) to cancel Request by pass to 2nd argument.

```typescript
import * as GooglePhotosAlbum from '../src/index';
const main = async () => {
  const re = await GooglePhotosAlbum.fetchImageUrls('https://photos.app.goo.gl/QCXy6XaKX5x1AynH8');
  console.log(JSON.stringfy(re, null, 2));
};
main().catch(er => console.error(er));
```

output example(see "Notice: Currently, there are two format of `url`" section)

```json
[
  {
    "uid": "AF1QipO4_Y5pseqWDPSlY7AAo0wmg76xW4gX0kOz8-p_",
    "url": "https://lh3.googleusercontent.com/Pt3C6874cqkfeuIVL0XZ-UCsC6zLzeQmxq7T9-sDiPhyAgvJiKl_SCrvrMMkpuWuZ1TFkU65ilaZJrCbePRYo1q1qGTYvFV6J8gbYfZhhxQuXm2zXx6QDQkj0K-uBBUzozw7YLYQ5g",
    "width": 640,
    "height": 480,
    "imageUpdateDate": 1317552314000,
    "albumAddDate": 1564229558506
  },
  {
    "uid": "AF1QipNcKcm3bkXUXl3tNYFNTlBDZfKUqvvV3JJi8MVJ",
    "url": "https://lh3.googleusercontent.com/Sl8wPPURFbFINwqgcEywOnpUk8sksgGKJI25Wtl885abhMoGHrxZh_qEe26bQmfv1OAG4ZX8qkz1svnLSJJZjh317TuU4cTk1vN04MbucjU8mlX7uDy0CPxVe8gggL-ftx6VgqWYxA",
    "width": 4000,
    "height": 3000,
    "imageUpdateDate": 1535348376000,
    "albumAddDate": 1565370026893
  },
  {
    "uid": "AF1QipNxMqbkMWKWOYGGwFwE4X9vOoGsn-L8BlwArcOQ",
    "url": "https://lh3.googleusercontent.com/i9DN1Lz7ft-oo-_Ubrprm8m4XyrI0sDpd5QFBlsNCV2FrWR2KYE95zLgPYSWcqdodGkCMEv7QZOIvRgfRqjlYLrfHQmGlQosTlvfYV8LcpyllenyOpJcgY-qRFN1wTjfZ-yQ-mzqjw",
    "width": 128,
    "height": 128,
    "imageUpdateDate": 1542123494000,
    "albumAddDate": 1565369489286
  },
  {
    "uid": "AF1QipNJ-9aWE3ufONJlqwUezKHj6u-fzMnT5_6XHppY",
    "url": "https://lh3.googleusercontent.com/ivJw0PWcKAIhffUa-1UMK75EMX7LQJ9CEwogzCpdZaFMw9_QcxKkWTiw74we5_0gW3dbFh2CRF60kngwc2tqtdy0r54VeEcSi-l77Jabr8QPP8IGUW3gfT6lFzR6RD8K0lpTFbT0Tw",
    "width": 2560,
    "height": 1920,
    "imageUpdateDate": 1561102312000,
    "albumAddDate": 1565372213085
  },
  {
    "uid": "AF1QipPPgtqCsxCboAH8XkEJeUOFsL0FT1PakyZwkODX",
    "url": "https://lh3.googleusercontent.com/W8s1YRbVDCzZB1MBkp9civLlO-nW5VODxaSkov4RAxI-rKxUaQou1vaTr1x1Upd_fv1jAEw-g8wACiQcKtJ2ZqlBtIYP-vHkr16Zl3BRU9K_1JsfTQ0ws5LDBptBHFlPAdwUh5NBCg",
    "width": 1920,
    "height": 835,
    "imageUpdateDate": 1564142679000,
    "albumAddDate": 1564149961764
  }
]
```

Unlike [the base URLs](https://developers.google.com/photos/library/reference/rest/v1/mediaItems#MediaItem) which can get via google photos api, `url` is not temporally.

`imageUpdateDate` and `albumAddDate` are Unix epoch time.

By default the url retrieve a small version of the image, to retrieve it to a specific dimension just append to the url `=wXXX-hXXX` where `XXX` are the dimensions

Fetching all pictures in full dimensions would be:

```js
let pics = await GooglePhotosAlbum.fetchImageUrls(albums[i]);
pics.forEach(pic => {
  fetch(`${pic.url}=w${pic.width}-h${pic.height}`);
});
```

## `GooglePhotosAlbum.extractAppended`

When you use this library with Google Photos API, you will want to call `GooglePhotosAlbum.fetchImageUrls` multiple times to get the differences.

To extract new Image info created via [`batchCreate` of Google Photos API](https://developers.google.com/photos/library/reference/rest/v1/mediaItems/batchCreate),  
you can use `GooglePhotosAlbum.extractAppended`.

```typescript
import * as GooglePhotosAlbum from '../src/index';
const main = async () => {
  const before = await GooglePhotosAlbum.fetchImageUrls('https://photos.app.goo.gl/QCXy6XaKX5x1AynH8');
  // call batchCreate API
  const after = await GooglePhotosAlbum.fetchImageUrls('https://photos.app.goo.gl/QCXy6XaKX5x1AynH8');
  const appended = GooglePhotosAlbum.extractAppended(before, after);
  console.log(JSON.stringfy(appended, null, 2));
};
main().catch(er => console.error(er));
```

## `url` is really valid forever?

To prove `url` is not temporally, we create a cron job on Travis CI. That is proving that `url` is not temporally while the badge is green.

[![Build Status](https://travis-ci.org/yumetodo/google-photos-album-image-url-fetch.svg?branch=master)](https://travis-ci.org/yumetodo/google-photos-album-image-url-fetch)

The Hydrangea macrophylla flower picture shown below is also proving that.

```markdown
![froamt-1](https://lh3.googleusercontent.com/ivJw0PWcKAIhffUa-1UMK75EMX7LQJ9CEwogzCpdZaFMw9_QcxKkWTiw74we5_0gW3dbFh2CRF60kngwc2tqtdy0r54VeEcSi-l77Jabr8QPP8IGUW3gfT6lFzR6RD8K0lpTFbT0Tw)

![format-2](https://lh3.googleusercontent.com/pw/AL9nZEVCkd_5McMGTASxXDATcHabzpXxroM4D7A3qfk13tF0_IiixjIrVWf_HyPak8LPhrOJ_5t8911M4btRzYMnkrWKdFFGBLFG4Ksyes2WLO-RlHqPZu8)
```

![froamt-1](https://lh3.googleusercontent.com/ivJw0PWcKAIhffUa-1UMK75EMX7LQJ9CEwogzCpdZaFMw9_QcxKkWTiw74we5_0gW3dbFh2CRF60kngwc2tqtdy0r54VeEcSi-l77Jabr8QPP8IGUW3gfT6lFzR6RD8K0lpTFbT0Tw)

![format-2](https://lh3.googleusercontent.com/pw/AL9nZEVCkd_5McMGTASxXDATcHabzpXxroM4D7A3qfk13tF0_IiixjIrVWf_HyPak8LPhrOJ_5t8911M4btRzYMnkrWKdFFGBLFG4Ksyes2WLO-RlHqPZu8)

## Notice: Currently, there are two format of `url`

As far as I detected via CI shown above, there are two format of `url` like below:

- "https://lh3.googleusercontent.com/Pt3C6874cqkfeuIVL0XZ-UCsC6zLzeQmxq7T9-sDiPhyAgvJiKl_SCrvrMMkpuWuZ1TFkU65ilaZJrCbePRYo1q1qGTYvFV6J8gbYfZhhxQuXm2zXx6QDQkj0K-uBBUzozw7YLYQ5g"
  - exists since at least 2019(maybe from Google Photos started).
- "https://lh3.googleusercontent.com/pw/AL9nZEV1iNMg-BoRi9GwhhnWNG1SLsFVVhn3xcwh2HaFendlbRJ4DbmEVO9EhQ1SrM4H3zXcbiBYLT9F-e7oyq8I1mrluxlb-00N8dimii_zV7fbE3F080Y"
  - exists since at least `2022-11-20T17:27:38Z`.

I cannot find the way to specify the format. See #19.

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fyumetodo%2Fgoogle-photos-album-image-url-fetch.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fyumetodo%2Fgoogle-photos-album-image-url-fetch?ref=badge_large)
