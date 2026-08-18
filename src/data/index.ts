import { cadocsApiSections } from './collections/cadocs-api-sections';
import { cardosApiSections } from './collections/cardos-api-sections';
import { onboardosApiSections } from './collections/onboardos-api-sections';
import { parceirosOnboardingApiSections } from './collections/parceiros-onboarding-api-sections';
import { paymentosPixTedApiSections } from './collections/paymentos-pix-ted-api-sections';
import { paymentOsPixTedSections } from './collections/paymentOsPixTedSections';

export const allApiSections = [
  ...cadocsApiSections,
  ...cardosApiSections,
  ...onboardosApiSections,
  ...parceirosOnboardingApiSections,
  ...paymentosPixTedApiSections,
  ...paymentOsPixTedSections,
];
