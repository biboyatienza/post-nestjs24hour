export class PatchServiceImageDto{
  constructor(public readonly imageId: number, public readonly userdId: number, public readonly hits: number, public readonly uri: string){}
}