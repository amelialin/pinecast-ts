export interface ExifData {
  image: {
    Make?: string;
    Model?: string;
    Orientation?: number;
    XResolution?: number;
    YResolution?: number;
    ResolutionUnit?: number;
    Software?: string;
    ModifyDate?: string;
    YCbCrPositioning?: number;
    Copyright?: string;
    ExifOffset?: number;
  };
  thumbnail: {
    Compression?: number;
    Orientation?: number;
    XResolution?: number;
    YResolution?: number;
    ResolutionUnit?: number;
    ThumbnailOffset?: number;
    ThumbnailLength?: number;
    YCbCrPositioning?: number;
  };
  exif: {
    FNumber?: number;
    ExposureProgram?: number;
    ISO?: number;
    ExifVersion?: ArrayBuffer;
    DateTimeOriginal?: '2000:08:04 18:22:57';
    CreateDate?: '2000:08:04 18:22:57';
    ComponentsConfiguration?: ArrayBuffer;
    CompressedBitsPerPixel?: number;
    ShutterSpeedValue?: number;
    ApertureValue?: number;
    BrightnessValue?: number;
    ExposureCompensation?: number;
    MaxApertureValue?: number;
    MeteringMode?: number;
    Flash?: number;
    FocalLength?: number;
    MakerNote?: ArrayBuffer;
    FlashpixVersion?: ArrayBuffer;
    ColorSpace?: number;
    ExifImageWidth?: number;
    ExifImageHeight?: number;
    InteropOffset?: number;
    FocalPlaneXResolution?: number;
    FocalPlaneYResolution?: number;
    FocalPlaneResolutionUnit?: number;
    SensingMethod?: number;
    FileSource?: ArrayBuffer;
    SceneType?: ArrayBuffer;
  };
  gps: {};
  interoperability: {
    InteropIndex?: string;
    InteropVersion?: ArrayBuffer;
  };
  makernote: {
    Version?: ArrayBuffer;
    Quality?: string;
    Sharpness?: number;
    WhiteBalance?: number;
    FujiFlashMode?: number;
    FlashExposureComp?: number;
    Macro?: number;
    FocusMode?: number;
    SlowSync?: number;
    AutoBracketing?: number;
    BlurWarning?: number;
    FocusWarning?: number;
    ExposureWarning?: number;
  };
}

export class ExifImage {
  constructor(
    options: {image: Buffer | ArrayBuffer},
    callback:
      | ((error: string, exifData: null) => void)
      | ((error: null, exifData: ExifData) => void),
  );
}
