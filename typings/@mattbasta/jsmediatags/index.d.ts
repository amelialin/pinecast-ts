export interface MediaTags {
  type: string;
  ftyp?: string;
  version: string | number;
  major?: number;
  revision?: number;
  tags: {
    title?: string;
    artist?: string;
    album?: string;
    track?: string;
    TPE1?: {
      id: string;
      size: number;
      description: string;
      data: string;
    };
    TALB?: {
      id: string;
      size: number;
      description: string;
      data: string;
    };
    TRCK?: {
      id: string;
      size: number;
      description: string;
      data: string;
    };
    CHAP?: any;
    CTOC?: any;
    picture?: {
      data: ArrayBuffer;
      format: string;
    };
  };
  size: number;
  flags: {
    unsynchronisation: false;
    extended_header: false;
    experimental_indicator: false;
    footer_present: false;
  };
}

export function read(
  asset: Buffer,
  options: {
    onSuccess: (tags: MediaTags) => void;
    onError: (error: {type: string}) => void;
  },
);
