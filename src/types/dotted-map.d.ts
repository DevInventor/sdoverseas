declare module 'dotted-map' {
  interface DottedMapOptions {
    height?: number;
    grid?: 'diagonal' | 'vertical' | 'horizontal';
  }

  interface SVGOptions {
    radius?: number;
    color?: string;
    shape?: 'circle' | 'square';
    backgroundColor?: string;
  }

  class DottedMap {
    constructor(options?: DottedMapOptions);
    getSVG(options?: SVGOptions): string;
  }

  export = DottedMap;
}
