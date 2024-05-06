import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class PostSticker {
  @Property()
  id: number;

  @Property()
  x: number;

  @Property()
  y: number;

  @Property()
  rotation: number;
}
