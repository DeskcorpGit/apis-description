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
];
