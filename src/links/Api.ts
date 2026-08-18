interface ApisProps {
  title: string;
  company: string;
  function: string;
  url: string;
}

export const Apis: ApisProps[] = [
  {
    title: 'OnboardOS API',
    company: 'CoreBanx',
    function: 'Onboarding',
    url: 'https://uat-onboarding.corebanxapp.com.br/docs/index.html#/',
  },
  {
    title: 'Paymentos API',
    company: 'CoreBanx',
    function: 'Payments',
    url: 'https://uat.corebanxapp.com.br/paymentos/docs/index.html#/',
  },
  {
    title: 'API Provedor Limite',
    company: 'Banco da Amazônia',
    function: 'Limite',
    url: 'https://api-provedor-limite.apps.ocp-hml.bancoamazonia.sa/',
  },
  {
    title: 'API Restritivos',
    company: 'Banco da Amazônia',
    function: 'Restritivos',
    url: 'https://api-restritivos.apps.ocp-hml.bancoamazonia.sa/',
  },
  {
    title: 'API Amazoncad',
    company: 'Banco da Amazônia',
    function: 'Cadastro de Clientes',
    url: 'https://api-amazoncad.apps.ocp-qa.bancoamazonia.sa/',
  },
  {
    title: 'Google API',
    company: 'Google',
    function: 'Pesquisar',
    url: 'https://www.google.com/',
  },
];
