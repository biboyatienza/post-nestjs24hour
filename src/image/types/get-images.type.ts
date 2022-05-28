  export class GetImagesInfoType {
      id: number;
      hits: number;
      uri: string;
  }

  export class GetImagesType {
      limit: number;
      data: GetImagesInfoType[];
  }


