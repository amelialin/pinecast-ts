export default class ID3Writer {
  constructor(source: ArrayBuffer);
  setFrame(
    frameID: 'APIC',
    value: {
      type: number;
      data: ArrayBuffer;
      description: string;
    },
  );
  setFrame(
    frameID: 'CHAP',
    value: {
      endOffset: number;
      endTime: number;
      id: string;
      startOffset: number;
      startTime: number;
      subFrames: {[frameID: string]: unknown};
    },
  );
  setFrame(
    frameID: 'CTOC',
    value: {
      id: string;
      ordered: boolean;
      topLevel: boolean;
      childElementIds: Array<unknown>;
      subFrames: {[frameID: string]: unknown};
    },
  );
  setFrame(frameID: string, value: string);
  setFrame(frameID: string, value: Array<string>);

  addTag(): void;
  getBlob(): ArrayBuffer;
}
