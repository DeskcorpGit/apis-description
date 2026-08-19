import onboardosAPIv100 from './Onboardos-APIv.1.0.0.json?url';

export interface ApiDocSpec {
  name: string;
  url: string;
}

export const allApisDocCollections: ApiDocSpec[] = [
  {
    name: 'Onboardos-API v.1.0.0',
    url: onboardosAPIv100,
  },
];
