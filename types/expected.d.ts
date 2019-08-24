import { ImageInfo } from '../src/imageInfo';

declare module '*/expected.json' {
  const value: ImageInfo[];
  export = value;
}