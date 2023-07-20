import { BytesPipe } from './bytes.pipe';

describe('BytesPipe', () => {
  let pipe: BytesPipe;

  beforeEach(() => {
    pipe = new BytesPipe();
  });

  it('create an instance', () => {
    const pipe = new BytesPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform bytes to human-readable format', () => {
    expect(pipe.transform(0)).toBe('0 Bytes');
    expect(pipe.transform(1023)).toBe('1023 Bytes');
    expect(pipe.transform(1024)).toBe('1 KB');
    expect(pipe.transform(1024 ** 2)).toBe('1 MB');
    expect(pipe.transform(1024 ** 3)).toBe('1 GB');
    expect(pipe.transform(1024 ** 4)).toBe('1 TB');
    expect(pipe.transform(1024 ** 5)).toBe('1 PB');
    expect(pipe.transform(1024 ** 6)).toBe('1 EB');
    expect(pipe.transform(1024 ** 7)).toBe('1 ZB');
    expect(pipe.transform(1024 ** 8)).toBe('1 YB');
    expect(pipe.transform(1536, 1)).toBe('1.5 KB');
  });

  it('should return "0 Bytes" for undefined input', () => {
    expect(pipe.transform(undefined)).toBe('0 Bytes');
  });
});
