import allExternalEndpoints from './all-external-endpoints.openapi.json?url';
import collectionPix from './CollectionPix.yaml?url';

export interface ApiDocSpec {
  name: string;
  url: string;
}

export const allApisDocCollections: ApiDocSpec[] = [
  {
    name: 'APIs Externas BASA',
    url: allExternalEndpoints,
  },
  {
    name: 'APIs Pix',
    url: collectionPix,
  },
];
