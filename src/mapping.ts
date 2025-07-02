import { Id } from '@graphprotocol/grc-20';
import type { Mapping } from '@graphprotocol/hypergraph';

export const mapping: Mapping = {
  Address: {
    typeIds: [Id.Id('5c6e72fb-8340-47c0-8281-8be159ecd495')],
    properties: {
      name: Id.Id('a126ca53-0c8e-48d5-b888-82c734c38935'),
      addressLine1: Id.Id('d378e881-3ed9-4a60-b552-43ce64dac439'),
    },
  },
};
