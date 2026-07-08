import { basaApiSections } from "./basa-drop1-apis"
import { basaApiSectionsDrop2 } from "./basa-drop2-apis"
import { pixApiSections } from "./pix-apis"

export const allApiSections = [...basaApiSections, ...basaApiSectionsDrop2, ...pixApiSections]
