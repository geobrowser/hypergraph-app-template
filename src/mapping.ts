import { Id } from '@graphprotocol/grc-20';
import type { Mapping } from '@graphprotocol/hypergraph';

export const mapping: Mapping = {
  Project: {
    typeIds: [Id.Id('484a18c5-030a-499c-b0f2-ef588ff16d50')],
    properties: {
      name: Id.Id('a126ca53-0c8e-48d5-b888-82c734c38935'),
      description: Id.Id('9b1f76ff-9711-404c-861e-59dc3fa7d037'),
    },
    relations: {
      cover: Id.Id('34f53507-2e6b-42c5-a844-43981a77cfa2'),
      avatar: Id.Id('1155beff-fad5-49b7-a2e0-da4777b8792c'),
    }
  },
  Image: {
    typeIds: [Id.Id('ba4e4146-0010-499d-a0a3-caaa7f579d0e')],
    properties: {
      url: Id.Id('8a743832-c094-4a62-b665-0c3cc2f9c7bc'),
    },
  },
};
