import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class PostLocation {
  @Property({ columnType: 'float' })
  latitude: number;

  @Property({ columnType: 'float' })
  longitude: number;
}
