export interface ImageFile {
  src: string;
  name: string;
  file: File;
  isConverted?: boolean;
}

export interface ConvertImages {
  startFormat: string;
  endFormat: string;
  images: ImageFile[];
}
