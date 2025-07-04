import { Entity, Type } from '@graphprotocol/hypergraph';

export class Image extends Entity.Class<Image>('Image')({
    url: Type.Text,
}) {}

export class Project extends Entity.Class<Project>('Project')({
    name: Type.Text,
    description: Type.Text,
    cover: Type.Relation(Image),
    avatar: Type.Relation(Image),
}) {}