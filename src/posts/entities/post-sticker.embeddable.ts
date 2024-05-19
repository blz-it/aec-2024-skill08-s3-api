import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class PostSticker {
  @Property()
  name: string;

  @Property({ columnType: 'float' })
  x: number;

  @Property({ columnType: 'float' })
  y: number;

  @Property({ columnType: 'float' })
  rotation: number;
}
