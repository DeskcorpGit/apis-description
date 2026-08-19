import cadocs from './Cadocs.json?url';

export interface ApiDocSpec {
  name: string;
  url: string;
}

export const allApisDocCollections: ApiDocSpec[] = [
  {
    name: 'Cadocs Teste',
    url: cadocs,
  },
];
