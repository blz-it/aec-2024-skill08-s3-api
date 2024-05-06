import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  username: string;

  @Property({ nullable: true })
  caption?: string;

  // @Property()
  // pictureUrl: string;
}
