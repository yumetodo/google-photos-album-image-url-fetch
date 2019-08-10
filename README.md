# google-photos-album-image-url-fetch

[![Build Status](https://travis-ci.org/yumetodo/google-photos-album-image-url-fetch.svg?branch=master)](https://travis-ci.org/yumetodo/google-photos-album-image-url-fetch)

extract public image url from shared album url

```typescript
import { GooglePhotos } from 'google-photos-album-image-url-fetch';
const main = async () =>{
    const re = await GooglePhotos.Album.fetchImageUrls('https://photos.app.goo.gl/QCXy6XaKX5x1AynH8');
    console.log(JSON.stringfy(re, null, 2));
}
main().catch(er => console.error(er));
```

output example

```json
[
  {
    "url": "https://lh3.googleusercontent.com/NHgqSpIMUAryO1cx0vCrhSk_zbsSlDWiFuTtqHW-HcayR75JV9C0gOjwdrNa0m0bqpc6VzmtRuBi13muYb8xjs4KNFhinztt-5KM32k_E_c22pnzJw9dYG3mC-3yX_WuoNhR15WN8w",
    "width": 640,
    "height": 480,
    "imageUpdateDate": 1317552314000,
    "albumAddDate": 1564229558506
  },
  {
    "url": "https://lh3.googleusercontent.com/ZM3BxtqRwDpCMv2stl2juHzOtQ3xYMrYbAQ0W5rAB6hvkDZYf04GdncyR3m8JNSptiPbAUWZut7_r73Xak_3O87c6xAjWfvLk7ccs78prsRxyeVjkjBkwMtiz3qE6y4C8JgIHyZDUA",
    "width": 4000,
    "height": 3000,
    "imageUpdateDate": 1535348376000,
    "albumAddDate": 1565370026893
  },
  {
    "url": "https://lh3.googleusercontent.com/u8XZ6eD3nmATalBuFn2aCRK9mRm5x1nFs91H6UgvPnOiQAVURugGUjfte3EYacSwsykHa4ea0WxPl_5NRklqMl3bh4vE9Di6B5XgDqbjt8Lhn8RnRFf8yWW3ovujYGO_OxBu8Ubnkw",
    "width": 128,
    "height": 128,
    "imageUpdateDate": 1542123494000,
    "albumAddDate": 1565369489286
  },
  {
    "url": "https://lh3.googleusercontent.com/zPhMfeo2liONsNfsikJbGRt3ygtuQ8ZQ1xPjNDCSaOhbRd5_HorUIL3b7CV_yEIZl1_5Ue_6ubyzLuLlglOt4NyndqZubl-67-giaI7Pz196i-ZL70Em50UF_RieTffiKowZFvaaog",
    "width": 2560,
    "height": 1920,
    "imageUpdateDate": 1561102312000,
    "albumAddDate": 1565372213085
  },
  {
    "url": "https://lh3.googleusercontent.com/xWaEwUGvHWp_nHboXBmJBMdQ53VXY2zsjYEjwfkp5s7yMMPVjjdcB99v5TIMcuzpunn-DZ1ovFq9bJ7JAQBdr5pFFdyNl5nqwV7dFVKY0mNU8cZsLBwbgUZu8_yqBaeYJ6THpk6ZYg",
    "width": 1920,
    "height": 835,
    "imageUpdateDate": 1564142679000,
    "albumAddDate": 1564149961764
  }
]
```

Unlike [the base URLs](https://developers.google.com/photos/library/reference/rest/v1/mediaItems#MediaItem) which can get via google photos api, `url` is not temporally.

`imageUpdateDate` and `albumAddDate` are Unix epoch time.

To prove `url` is not temporally, we create a cron job on Travis CI.  That is proving that `url` is not temporally while the badge is green.

[![Build Status](https://travis-ci.org/yumetodo/google-photos-album-image-url-fetch.svg?branch=master)](https://travis-ci.org/yumetodo/google-photos-album-image-url-fetch)

The Hydrangea macrophylla flower picture shown below is also proving that.

```markdown
![img](https://lh3.googleusercontent.com/ivJw0PWcKAIhffUa-1UMK75EMX7LQJ9CEwogzCpdZaFMw9_QcxKkWTiw74we5_0gW3dbFh2CRF60kngwc2tqtdy0r54VeEcSi-l77Jabr8QPP8IGUW3gfT6lFzR6RD8K0lpTFbT0Tw)
```

![img](https://lh3.googleusercontent.com/ivJw0PWcKAIhffUa-1UMK75EMX7LQJ9CEwogzCpdZaFMw9_QcxKkWTiw74we5_0gW3dbFh2CRF60kngwc2tqtdy0r54VeEcSi-l77Jabr8QPP8IGUW3gfT6lFzR6RD8K0lpTFbT0Tw)
