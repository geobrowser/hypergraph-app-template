import { Entity, Type } from '@graphprotocol/hypergraph';
export class Address extends Entity.Class<Address>('Address')({
  name: Type.Text,
  description: Type.Text,
  // active: Type.Checkbox
}) {}

export class NewsStory extends Entity.Class<NewsStory>('NewsStory')({
  name: Type.Text,
}) {}