import { Entity, Type } from '@graphprotocol/hypergraph';

export class City extends Entity.Class<City>('City')({
name: Type.Text,
description: Type.Text
}) {}

export class Address extends Entity.Class<Address>('Address')({
name: Type.Text,
addressLine1: Type.Text,
city: Type.Relation(City)
}) {}