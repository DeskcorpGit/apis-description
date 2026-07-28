import { basaApiSections } from './basa-drop1-apis';
import { basaApiSectionsDrop2 } from './basa-drop2-apis';
import { pixApiSections } from './pix-apis';
import { paymentosApis } from './paymentos-apis';
import { transferApis, transferSpiApis } from './transfer-apis';

export const allApiSections = [
  ...basaApiSections,
  ...basaApiSectionsDrop2,
  ...pixApiSections,
  transferApis,
  transferSpiApis,
  paymentosApis,
];
