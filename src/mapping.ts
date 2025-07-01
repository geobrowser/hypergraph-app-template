import { Id } from '@graphprotocol/grc-20';
import type { Mapping } from '@graphprotocol/hypergraph';

export const mapping: Mapping = {
  City: {
    typeIds: [Id.Id('01b05333-941a-4b00-bc78-fac5a15b467d')],
    properties: {
      name: Id.Id('a126ca53-0c8e-48d5-b888-82c734c38935'),
      description: Id.Id('9b1f76ff-9711-404c-861e-59dc3fa7d037'),
    },
  },
  Address: {
    typeIds: [Id.Id('5c6e72fb-8340-47c0-8281-8be159ecd495')],
    properties: {
      name: Id.Id('a126ca53-0c8e-48d5-b888-82c734c38935'),
      addressLine1: Id.Id('d378e881-3ed9-4a60-b552-43ce64dac439'),
    },
    relations: {
      city: Id.Id('5648dbdc-c09d-4d27-a840-5c50d8355268'),
    },
  },
};
