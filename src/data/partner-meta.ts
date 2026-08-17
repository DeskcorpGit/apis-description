interface PartnerMetaEntry {
  gradient: string;
  description: string;
}

export const PARTNER_META: Record<string, PartnerMetaEntry> = {
  Corebanx: {
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Onboarding, compliance e gestão de entidades',
  },
  Transact: {
    gradient: 'from-blue-500 to-indigo-600',
    description: 'Core bancário, contas, customers e cadastro base',
  },
  Authcube: {
    gradient: 'from-violet-500 to-purple-600',
    description: 'Autenticação OAuth2 e recuperação de senha',
  },
  Fabric: {
    gradient: 'from-amber-500 to-orange-600',
    description: 'Identity, CMS, beneficiários e integração',
  },
  Neobiz: {
    gradient: 'from-cyan-500 to-sky-600',
    description: 'Documentação, termos e consultas de endereço',
  },
  Valid: {
    gradient: 'from-yellow-500 to-orange-600',
    description: 'Validação de Documentos',
  },
};

export const DEFAULT_PARTNER_GRADIENT = 'from-gray-500 to-slate-600';
export const DEFAULT_PARTNER_DESCRIPTION = 'APIs e serviços diversos';
