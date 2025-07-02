import { Entity, Type } from '@graphprotocol/hypergraph';
export class Address extends Entity.Class<Address>('Address')({
name: Type.Text,
addressLine1: Type.Text,
}) {}