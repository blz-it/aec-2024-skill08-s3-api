import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class PostLocation {
  @Property()
  latitude: number;

  @Property()
  longitude: number;
}
