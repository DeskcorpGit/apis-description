import type { ApiData } from '@/types/api';

export const parceirosOnboardingApiSections: ApiData[] = [
  {
    title: 'Authcube',
    baseUrl: 'https://oauthcube-devqa.basa.com.br',
    partner: 'Authcube',
    description:
      'Endpoints da plataforma AuthCube (OAuthCube) responsáveis pela geração de token de acesso e pelo gerenciamento (criação e remoção) de usuários utilizados no fluxo de onboarding de parceiros.',
    endpoints: [
      {
        method: 'POST',
        path: '/BasaUAT/connect/token',
        summary: 'Get Token',
        tags: ['Authcube'],
        parameters: [
          {
            name: 'client_id',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'client_secret',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'grant_type',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/applications/BasaUAT/users',
        summary: 'Create User',
        tags: ['Authcube'],
        parameters: [
          {
            name: 'Cookie',
            in: 'header',
            required: true,
            type: 'string',
            description: 'session=.{{cookie}}',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Bearer ',
          },
        ],
        requestBody:
          '{\n  "attributes": {\n    "cpf": "12345678909",\n    "password": "SenhaDoSignup123!",\n    "username": "12345678909",\n    "entity_id": "0a4c1f9e-2c7d-4b3a-9f11-6e8b2d5a7c40",\n    "signup_status": true,\n    "phone_number": "+5541991942476",\n    "phone_number_verified": true\n  }\n}',
      },
      {
        method: 'DELETE',
        path: '/api/applications/BasaUAT/users/{{document}}',
        summary: 'Remove User',
        tags: ['Authcube'],
        parameters: [
          {
            name: 'Cookie',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{cookie}}',
          },
        ],
      },
    ],
  },
  {
    title: 'Restritivos',
    baseUrl: '{{baseUrl}}',
    partner: 'Restritivos',
    description:
      'Conjunto de endpoints da API de Restritivos, responsável por consultas de score, restritivos financeiros, certidões, CAF, CADIN, NF-e, histórico de consultas, biometria e configurações relacionadas à análise de risco de clientes pessoa física e jurídica.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/scr/{documento}/periodo',
        summary: 'Consulta SCR por Período',
        tags: ['Restritivos', 'scr', 'periodo'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
          {
            name: 'dataBase',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Database para pesquisa de restritivo',
          },
          {
            name: 'qtdMesesAnteriores',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Qtd de meses anteriores à database para pesquisa de restritivos para um período',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '[\n  {\n    "dataBase": "3994-63",\n    "situacaoScr": "NAO_CONSULTADO",\n    "possuiDadosClienteScr": true,\n    "possuiResumoEndividamentoScr": false,\n    "resumoDadosCliente": {\n      "percentualDocumentosProcessados": 7435.842374091945,\n      "percentualVolumeProcessado": 6268.989621762181,\n      "quantidadeInstituicoes": 7563,\n      "quantidadeOperacoes": 4232,\n      "quantidadeOperacoesSubJudice": 2201,\n      "responsabilidadeTotalSubJudice": 1342.648532195061\n    },\n    "resumoEndividamento": {\n      "valorAVencer": 5312.570056002222,\n      "valorCarteiraCredito": 4783.619205614623,\n      "valorCarteiraCreditoAte360Dias": 5421.05256405871,\n      "valorCoobrigacoes": 3640.1081882717835,\n      "valorCreditoALiberar": 1479.0631529625264,\n      "valorPrejuizo": 752.134417481426,\n      "valorRepassesInterfinanceiros": 774.5717291852616,\n      "valorRepassesInterfinanceirosAte360Dias": 4324.810656091362,\n      "valorResponsabilidadeTotal": 1893.7398040034436,\n      "valorRiscoTotal": 4474.909754516086,\n      "valorVencido": 2397.378436812828,\n      "valorCoobrigacoesAte360Dias": 3592.997609044015,\n      "valorAVencerAte360Dias": 6897.160607662643,\n      "valorVencidoAte360Dias": 4577.946846296624,\n      "valorAVencerDe361Ate720Dias": 3897.0984970716295,\n      "valorAVencerDe721Ate1080Dias": 5040.49899747835,\n      "valorAVencerDe1081Ate1440Dias": 1677.9195582238272,\n      "valorAVencerDe1441Ate1800Dias": 6315.585548345034,\n      "valorAVencerDe1801Ate5400Dias": 2112.1797413762424,\n      "valorAVencerAcimaDe5400Dias": 1982.1340771940577,\n      "valorResponsabilidadeTotalAte360Dias": 3843.1678290597406,\n      "valorVencidoAcimaDe360Dias": 9342.495283703043,\n      "valorAVencerAcimaDe360Dias": 5928.98085281095\n    },\n    "responsabilidadeCliente": {\n      "curtoPrazo": {\n        "vincendo": 549.2647531511785,\n        "vencido": 9452.300768544732,\n        "prejuizado": 6241.46291085467\n      },\n      "longoPrazo": {\n        "vincendo": 596.8597146892307,\n        "vencido": 1141.907595930912,\n        "prejuizado": 4180.537118550116\n      },\n      "coobrigacoes": {\n        "vincendo": 6601.280220022831,\n        "vencido": 6590.284036996583,\n        "prejuizado": 3997.2540034822755\n      }\n    },\n    "operacoes": [\n      {\n        "codigoModalidade": "string",\n        "descricaoDominio": "string",\n        "descricaoSubDominio": "string",\n        "variacaoCambial": "string",\n        "vencimentos": [\n          {\n            "codigoVencimento": "string",\n            "descricaoVencimento": "string",\n            "valorVencimento": 5622.109641318306\n          },\n          {\n            "codigoVencimento": "string",\n            "descricaoVencimento": "string",\n            "valorVencimento": 6087.89350199686\n          }\n        ]\n      },\n      {\n        "codigoModalidade": "string",\n        "descricaoDominio": "string",\n        "descricaoSubDominio": "string",\n        "variacaoCambial": "string",\n        "vencimentos": [\n          {\n            "codigoVencimento": "string",\n            "descricaoVencimento": "string",\n            "valorVencimento": 344.81171082669124\n          },\n          {\n            "codigoVencimento": "string",\n            "descricaoVencimento": "string",\n            "valorVencimento": 272.4217375076943\n          }\n        ]\n      }\n    ],\n    "resumoEndividamentosInterno": [\n      {\n        "codigoModalidade": "string",\n        "codigoVencimento": "string",\n        "valorVencimento": 9927.625244184548\n      },\n      {\n        "codigoModalidade": "string",\n        "codigoVencimento": "string",\n        "valorVencimento": 211.2990401054726\n      }\n    ],\n    "atenuado": true,\n    "atenuacao": {\n      "dataHoraCalculo": "1954-01-25T16:37:03.620Z",\n      "idPessoa": 9453,\n      "documento": "string",\n      "tipoPessoa": "PF",\n      "nivelRisco": "string",\n      "totalRendas": 6742.784641594935,\n      "totalFaturamento": 4206.580535854629,\n      "totalFinanceiro": 6963.1395904782585,\n      "totalRendasComuns": 5710.2113625309385,\n      "valorRbire": 4316.168095493522,\n      "valorRmpr": 150.53380797800276,\n      "quantidadeOcupacoes": 9359,\n      "quantidadeRendas": 980,\n      "quantidadeFaturamentos": 8367,\n      "restritivos": [\n        {\n          "tipoRestritivo": "string",\n          "categoriaRestritivo": "string",\n          "valorRestritivo": 9870.277269769791,\n          "percentualRestritivo": 6379.496575987365,\n          "atenuado": true,\n          "mensagem": "string",\n          "criterioAtenuacao": "string",\n          "totalRestritivo": 9526.129031897783\n        },\n        {\n          "tipoRestritivo": "string",\n          "categoriaRestritivo": "string",\n          "valorRestritivo": 6248.388791860051,\n          "percentualRestritivo": 7331.396185563588,\n          "atenuado": true,\n          "mensagem": "string",\n          "criterioAtenuacao": "string",\n          "totalRestritivo": 5874.416294522878\n        }\n      ],\n      "atenuado": true\n    }\n  },\n  {\n    "dataBase": "2135-19",\n    "situacaoScr": "NAO_CONSULTADO",\n    "possuiDadosClienteScr": true,\n    "possuiResumoEndividamentoScr": true,\n    "resumoDadosCliente": {\n      "percentualDocumentosProcessados": 385.41340076835183,\n      "percentualVolumeProcessado": 5265.354780641869,\n      "quantidadeInstituicoes": 1109,\n      "quantidadeOperacoes": 7186,\n      "quantidadeOperacoesSubJudice": 412,\n      "responsabilidadeTotalSubJudice": 5847.138631743952\n    },\n    "resumoEndividamento": {\n      "valorAVencer": 1011.7646434831317,\n      "valorCarteiraCredito": 8538.038191511605,\n      "valorCarteiraCreditoAte360Dias": 9251.47103833912,\n      "valorCoobrigacoes": 2570.911799500404,\n      "valorCreditoALiberar": 7417.756048125043,\n      "valorPrejuizo": 5170.639135066918,\n      "valorRepassesInterfinanceiros": 4628.858430964607,\n      "valorRepassesInterfinanceirosAte360Dias": 6951.4164767443835,\n      "valorResponsabilidadeTotal": 5241.290371501589,\n      "valorRiscoTotal": 6856.022672092779,\n      "valorVencido": 77.76290738548019,\n      "valorCoobrigacoesAte360Dias": 7189.394078865312,\n      "valorAVencerAte360Dias": 8801.70135734566,\n      "valorVencidoAte360Dias": 963.0750604048822,\n      "valorAVencerDe361Ate720Dias": 5257.875449756436,\n      "valorAVencerDe721Ate1080Dias": 6569.859798866287,\n      "valorAVencerDe1081Ate1440Dias": 2974.5910690679157,\n      "valorAVencerDe1441Ate1800Dias": 4968.660092689257,\n      "valorAVencerDe1801Ate5400Dias": 260.20067775832877,\n      "valorAVencerAcimaDe5400Dias": 4435.993999393305,\n      "valorResponsabilidadeTotalAte360Dias": 1423.4338937832702,\n      "valorVencidoAcimaDe360Dias": 9513.855826037794,\n      "valorAVencerAcimaDe360Dias": 7517.516996816426\n    },\n    "responsabilidadeCliente": {\n      "curtoPrazo": {\n        "vincendo": 5476.444646676489,\n        "vencido": 274.57876857863715,\n        "prejuizado": 3431.9664668610394\n      },\n      "longoPrazo": {\n        "vincendo": 6150.521662794876,\n        "vencido": 8843.1529824733,\n        "prejuizado": 9684.094015198978\n      },\n      "coobrigacoes": {\n        "vincendo": 8362.32754944749,\n        "vencido": 5908.617598732635,\n        "prejuizado": 5065.860343754729\n      }\n    },\n    "operacoes": [\n      {\n        "codigoModalidade": "string",\n        "descricaoDominio": "string",\n        "descricaoSubDominio": "string",\n        "variacaoCambial": "string",\n        "vencimentos": [\n          {\n            "codigoVencimento": "string",\n            "descricaoVencimento": "string",\n            "valorVencimento": 7922.296952461506\n          },\n          {\n            "codigoVencimento": "string",\n            "descricaoVencimento": "string",\n            "valorVencimento": 9840.708738376488\n          }\n        ]\n      },\n      {\n        "codigoModalidade": "string",\n        "descricaoDominio": "string",\n        "descricaoSubDominio": "string",\n        "variacaoCambial": "string",\n        "vencimentos": [\n          {\n            "codigoVencimento": "string",\n            "descricaoVencimento": "string",\n            "valorVencimento": 7419.08023694175\n          },\n          {\n            "codigoVencimento": "string",\n            "descricaoVencimento": "string",\n            "valorVencimento": 1441.530385362546\n          }\n        ]\n      }\n    ],\n    "resumoEndividamentosInterno": [\n      {\n        "codigoModalidade": "string",\n        "codigoVencimento": "string",\n        "valorVencimento": 2900.537592452067\n      },\n      {\n        "codigoModalidade": "string",\n        "codigoVencimento": "string",\n        "valorVencimento": 2895.4442739491305\n      }\n    ],\n    "atenuado": true,\n    "atenuacao": {\n      "dataHoraCalculo": "1974-03-02T08:20:59.478Z",\n      "idPessoa": 3320,\n      "documento": "string",\n      "tipoPessoa": "PR",\n      "nivelRisco": "string",\n      "totalRendas": 9500.148314377953,\n      "totalFaturamento": 8595.625350501407,\n      "totalFinanceiro": 1566.3227239177347,\n      "totalRendasComuns": 5560.348996621415,\n      "valorRbire": 9375.513764891224,\n      "valorRmpr": 2096.991101433144,\n      "quantidadeOcupacoes": 3327,\n      "quantidadeRendas": 1651,\n      "quantidadeFaturamentos": 1516,\n      "restritivos": [\n        {\n          "tipoRestritivo": "string",\n          "categoriaRestritivo": "string",\n          "valorRestritivo": 7051.167167240717,\n          "percentualRestritivo": 6186.723075582394,\n          "atenuado": false,\n          "mensagem": "string",\n          "criterioAtenuacao": "string",\n          "totalRestritivo": 1467.9977410937483\n        },\n        {\n          "tipoRestritivo": "string",\n          "categoriaRestritivo": "string",\n          "valorRestritivo": 9330.615332584823,\n          "percentualRestritivo": 5716.655118990852,\n          "atenuado": true,\n          "mensagem": "string",\n          "criterioAtenuacao": "string",\n          "totalRestritivo": 6515.718998068699\n        }\n      ],\n      "atenuado": false\n    }\n  }\n]',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/scr/{documento}',
        summary: 'Consulta SCR',
        tags: ['Restritivos', 'scr'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
          {
            name: 'tipoConsultaScr',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Tipo de Consulta a realizar',
          },
          {
            name: 'dataBase',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Database para pesquisa de restritivo',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "dataBase": "8854-99",\n  "situacaoScr": "NAO",\n  "possuiDadosClienteScr": false,\n  "possuiResumoEndividamentoScr": true,\n  "resumoDadosCliente": {\n    "percentualDocumentosProcessados": 4420.576012454721,\n    "percentualVolumeProcessado": 2240.8948195924127,\n    "quantidadeInstituicoes": 9155,\n    "quantidadeOperacoes": 701,\n    "quantidadeOperacoesSubJudice": 6880,\n    "responsabilidadeTotalSubJudice": 2587.6166691963085\n  },\n  "resumoEndividamento": {\n    "valorAVencer": 2357.78921644079,\n    "valorCarteiraCredito": 4459.184967938652,\n    "valorCarteiraCreditoAte360Dias": 6827.510860876779,\n    "valorCoobrigacoes": 6095.971122116572,\n    "valorCreditoALiberar": 9979.524478969755,\n    "valorPrejuizo": 3249.7895036083855,\n    "valorRepassesInterfinanceiros": 7341.859924690032,\n    "valorRepassesInterfinanceirosAte360Dias": 6552.31968205725,\n    "valorResponsabilidadeTotal": 6784.843866696198,\n    "valorRiscoTotal": 686.7289385597975,\n    "valorVencido": 9572.631289593972,\n    "valorCoobrigacoesAte360Dias": 2564.754325119423,\n    "valorAVencerAte360Dias": 5491.801339112111,\n    "valorVencidoAte360Dias": 5660.604331645288,\n    "valorAVencerDe361Ate720Dias": 7868.954387891937,\n    "valorAVencerDe721Ate1080Dias": 5226.475680884265,\n    "valorAVencerDe1081Ate1440Dias": 8065.686680285251,\n    "valorAVencerDe1441Ate1800Dias": 3683.6098357877813,\n    "valorAVencerDe1801Ate5400Dias": 589.8237538481466,\n    "valorAVencerAcimaDe5400Dias": 7405.4106704885935,\n    "valorResponsabilidadeTotalAte360Dias": 2155.404551092189,\n    "valorVencidoAcimaDe360Dias": 7554.770843656127,\n    "valorAVencerAcimaDe360Dias": 46.522194930231905\n  },\n  "responsabilidadeCliente": {\n    "curtoPrazo": {\n      "vincendo": 479.3923716038506,\n      "vencido": 6518.340920337558,\n      "prejuizado": 5223.777799983988\n    },\n    "longoPrazo": {\n      "vincendo": 8184.122503218766,\n      "vencido": 1338.1822850307535,\n      "prejuizado": 6770.719682610892\n    },\n    "coobrigacoes": {\n      "vincendo": 9147.216883807781,\n      "vencido": 3082.527152261726,\n      "prejuizado": 8889.835000890795\n    }\n  },\n  "operacoes": [\n    {\n      "codigoModalidade": "string",\n      "descricaoDominio": "string",\n      "descricaoSubDominio": "string",\n      "variacaoCambial": "string",\n      "vencimentos": [\n        {\n          "codigoVencimento": "string",\n          "descricaoVencimento": "string",\n          "valorVencimento": 9760.001569826625\n        },\n        {\n          "codigoVencimento": "string",\n          "descricaoVencimento": "string",\n          "valorVencimento": 1414.1703104628423\n        }\n      ]\n    },\n    {\n      "codigoModalidade": "string",\n      "descricaoDominio": "string",\n      "descricaoSubDominio": "string",\n      "variacaoCambial": "string",\n      "vencimentos": [\n        {\n          "codigoVencimento": "string",\n          "descricaoVencimento": "string",\n          "valorVencimento": 1674.8312765158346\n        },\n        {\n          "codigoVencimento": "string",\n          "descricaoVencimento": "string",\n          "valorVencimento": 2777.96539697445\n        }\n      ]\n    }\n  ],\n  "resumoEndividamentosInterno": [\n    {\n      "codigoModalidade": "string",\n      "codigoVencimento": "string",\n      "valorVencimento": 2213.67348135055\n    },\n    {\n      "codigoModalidade": "string",\n      "codigoVencimento": "string",\n      "valorVencimento": 9534.373360631294\n    }\n  ],\n  "atenuado": true,\n  "atenuacao": {\n    "dataHoraCalculo": "2001-11-18T12:06:42.888Z",\n    "idPessoa": 1956,\n    "documento": "string",\n    "tipoPessoa": "PF",\n    "nivelRisco": "string",\n    "totalRendas": 3056.455995910593,\n    "totalFaturamento": 8152.702856924799,\n    "totalFinanceiro": 7442.522399866266,\n    "totalRendasComuns": 8813.078859562405,\n    "valorRbire": 2694.21609542306,\n    "valorRmpr": 8814.552874606989,\n    "quantidadeOcupacoes": 3666,\n    "quantidadeRendas": 938,\n    "quantidadeFaturamentos": 5692,\n    "restritivos": [\n      {\n        "tipoRestritivo": "string",\n        "categoriaRestritivo": "string",\n        "valorRestritivo": 8552.215586431086,\n        "percentualRestritivo": 4783.683621642692,\n        "atenuado": false,\n        "mensagem": "string",\n        "criterioAtenuacao": "string",\n        "totalRestritivo": 9182.667156731446\n      },\n      {\n        "tipoRestritivo": "string",\n        "categoriaRestritivo": "string",\n        "valorRestritivo": 6580.486543392762,\n        "percentualRestritivo": 7518.29672501237,\n        "atenuado": false,\n        "mensagem": "string",\n        "criterioAtenuacao": "string",\n        "totalRestritivo": 5985.450051103843\n      }\n    ],\n    "atenuado": false\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/serasa/score-h4pj/{documento}',
        summary: 'consultar Score H4pj',
        description:
          'Busca SCORE H4PJ\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- SERASA',
        tags: ['Restritivos', 'serasa', 'score-h4pj'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "id": 5040,\n  "reportName": "RELATORIO_DADOS_AVULSOS_PJ",\n  "companyDocument": "string",\n  "companyName": "string",\n  "score": 9432,\n  "scoreModel": "H4PJ",\n  "defaultRate": "string",\n  "message": "string"\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/serasa/score-hpj8/{documento}',
        summary: 'consultar Serasa Score Mei 1',
        description:
          'Busca SCORE HPJ8\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- SERASA',
        tags: ['Restritivos', 'serasa', 'score-hpj8'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "id": 5235,\n  "cnpj": "string",\n  "data": "1985-05-16T16:28:45.990Z",\n  "calculado": 1,\n  "fator": 557,\n  "prinad": 91.16610695752053,\n  "codigoMensagem": 866,\n  "mensagem": "string",\n  "erro": 0\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/serasa/score-hpj8',
        summary: 'consultar Serasa Score Mei',
        description:
          'Busca SCORE HPJ8 por Id Consulta\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- SERASA',
        tags: ['Restritivos', 'serasa', 'score-hpj8'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'idConsulta',
            in: 'query',
            required: true,
            type: 'string',
            description: 'ID da Consulta a ser buscada no cache',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "id": 5235,\n  "cnpj": "string",\n  "data": "1985-05-16T16:28:45.990Z",\n  "calculado": 1,\n  "fator": 557,\n  "prinad": 91.16610695752053,\n  "codigoMensagem": 866,\n  "mensagem": "string",\n  "erro": 0\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/serasa/{documento}',
        summary: 'consultar Serasa',
        description:
          'Realiza consultas no SERASA\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- SERASA',
        tags: ['Restritivos', 'serasa'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "codigoSolicitacao": 6490,\n  "situacaoSerasa": "SIM",\n  "scoring": {\n    "codigoRetorno": "string",\n    "codigoScoring": "string",\n    "dataReferencia": "2005-12-27",\n    "mensagemScoring": "string",\n    "pontuacao": "string",\n    "tipoRegistro": "string"\n  },\n  "confirmacaoTelefone": {\n    "bairro": "string",\n    "cep": "string",\n    "cidade": "string",\n    "classeAssinante": "string",\n    "codigoRetorno": "string",\n    "dddTelefone": "string",\n    "documentoConfere": "string",\n    "logradouro": "string",\n    "mensagem": "string",\n    "nomeAssinante": "string",\n    "numeroTelefone": "string",\n    "tipoAssinente": "string",\n    "tipoRegistro": "string"\n  },\n  "confirmei": {\n    "dataConfirmei": "1971-01-16",\n    "dataSituacao": "2020-12-27",\n    "municipio": "string",\n    "nome": "string",\n    "nomeMaeFantasia": "string",\n    "situacao": "CANCELADA",\n    "tipoRegistro": "string",\n    "uf": "string"\n  },\n  "consultasPorBanco": {\n    "detalhes": [\n      {\n        "mes": "5003-69",\n        "quantidadeConsultas": 9624\n      },\n      {\n        "mes": "2868-98",\n        "quantidadeConsultas": 1423\n      }\n    ],\n    "tipoRegistro": "string"\n  },\n  "consultasPorEmpresa": {\n    "detalhes": [\n      {\n        "mes": "1643-27",\n        "quantidadeConsultas": 6250\n      },\n      {\n        "mes": "9879-20",\n        "quantidadeConsultas": 3660\n      }\n    ],\n    "tipoRegistro": "string"\n  },\n  "mensagemAlerta": {\n    "mensagemAlerta": "string",\n    "sequencialRegistro": "string",\n    "tipoRegistro": "string"\n  },\n  "resumoAchei": {\n    "detalhes": [\n      {\n        "cidade": "string",\n        "codigoAgencia": "string",\n        "codigoBanco": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1975-01-18",\n        "descricaoNatureza": "string",\n        "nomeBanco": "string",\n        "numeroCheque": "string",\n        "numeroContaCorrente": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "titularContaConjunta": "string",\n        "uf": "string",\n        "valorCheque": 1302.3561844839437\n      },\n      {\n        "cidade": "string",\n        "codigoAgencia": "string",\n        "codigoBanco": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1987-02-20",\n        "descricaoNatureza": "string",\n        "nomeBanco": "string",\n        "numeroCheque": "string",\n        "numeroContaCorrente": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "titularContaConjunta": "string",\n        "uf": "string",\n        "valorCheque": 8635.729387498257\n      }\n    ],\n    "dataInicial": "1974-09-06",\n    "dataFinal": "2008-05-31",\n    "quantidadeOcorrencia": 5825,\n    "tipoRegistro": "string"\n  },\n  "resumoAcoes": {\n    "detalhes": [\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1980-12-26",\n        "descricaoNatureza": "string",\n        "numeroDistribuidor": "string",\n        "numeroVaraCivil": "string",\n        "praca": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "valorAcao": 5693.522256661729\n      },\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2008-02-24",\n        "descricaoNatureza": "string",\n        "numeroDistribuidor": "string",\n        "numeroVaraCivil": "string",\n        "praca": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "valorAcao": 3050.213697883396\n      }\n    ],\n    "dataInicial": "1994-05-09",\n    "dataFinal": "1972-03-22",\n    "quantidadeOcorrencia": 2242,\n    "tipoRegistro": "string"\n  },\n  "resumoCCF": {\n    "detalhes": [\n      {\n        "cidade": "string",\n        "codigoAgencia": "string",\n        "codigoBanco": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2026-03-08",\n        "descricaoNatureza": "string",\n        "nomeBanco": "string",\n        "praca": "string",\n        "quantidadeCheques": 1020,\n        "tipoRegistro": "string",\n        "uf": "string"\n      },\n      {\n        "cidade": "string",\n        "codigoAgencia": "string",\n        "codigoBanco": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2001-10-27",\n        "descricaoNatureza": "string",\n        "nomeBanco": "string",\n        "praca": "string",\n        "quantidadeCheques": 368,\n        "tipoRegistro": "string",\n        "uf": "string"\n      }\n    ],\n    "dataInicial": "1949-01-14",\n    "dataFinal": "1980-04-25",\n    "quantidadeOcorrencia": 6264,\n    "tipoRegistro": "string"\n  },\n  "resumoConvemDevedores": {\n    "detalhes": [\n      {\n        "cnpjCredor": "string",\n        "codigoNatureza": "string",\n        "contrato": "string",\n        "dataOcorrencia": "1966-05-02",\n        "descricaoNatureza": "string",\n        "nomeInstituicao": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "valorOcorrencia": 5973.585591679508\n      },\n      {\n        "cnpjCredor": "string",\n        "codigoNatureza": "string",\n        "contrato": "string",\n        "dataOcorrencia": "2014-08-09",\n        "descricaoNatureza": "string",\n        "nomeInstituicao": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "valorOcorrencia": 7440.462948684338\n      }\n    ],\n    "dataInicial": "1997-02-17",\n    "dataFinal": "2001-12-20",\n    "quantidadeOcorrencia": 903,\n    "tipoRegistro": "string"\n  },\n  "resumoFalenciaConcordata": {\n    "detalhes": [\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1981-04-06",\n        "descricaoNatureza": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "numeroVaraCivil": "string"\n      },\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2007-05-30",\n        "descricaoNatureza": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "numeroVaraCivil": "string"\n      }\n    ],\n    "dataInicial": "1987-04-06",\n    "dataFinal": "2025-12-27",\n    "quantidadeOcorrencia": 718,\n    "tipoRegistro": "string"\n  },\n  "resumoParticipanteEmpresaFalida": {\n    "detalhes": [\n      {\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2020-08-11",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "descricaoQualificacao": "string",\n        "codigoQualificacao": "string",\n        "nomeEmpresa": "string",\n        "numeroVaraCivil": "string",\n        "cnpjEmpresa": "string"\n      },\n      {\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1981-06-24",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "descricaoQualificacao": "string",\n        "codigoQualificacao": "string",\n        "nomeEmpresa": "string",\n        "numeroVaraCivil": "string",\n        "cnpjEmpresa": "string"\n      }\n    ],\n    "dataInicial": "1959-10-04",\n    "dataFinal": "2012-12-27",\n    "quantidadeOcorrencia": 8605,\n    "tipoRegistro": "string"\n  },\n  "resumoPefin": {\n    "detalhes": [\n      {\n        "cnpjCredor": "string",\n        "contrato": "string",\n        "nomeCredor": "string",\n        "nomeInstituicao": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "valorOcorrencia": 8196.592763459368,\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1969-01-27",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string"\n      },\n      {\n        "cnpjCredor": "string",\n        "contrato": "string",\n        "nomeCredor": "string",\n        "nomeInstituicao": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "valorOcorrencia": 5239.483569012291,\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1955-10-19",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string"\n      }\n    ],\n    "dataInicial": "1984-10-21",\n    "dataFinal": "1981-01-28",\n    "quantidadeOcorrencia": 1172,\n    "tipoRegistro": "string"\n  },\n  "resumoProtestos": {\n    "detalhes": [\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1958-09-10",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string",\n        "dataCarta": "2001-12-25",\n        "numeroCartorio": "string",\n        "subJudice": "string",\n        "valorProtesto": 3451.584935413757\n      },\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2018-02-27",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string",\n        "dataCarta": "1970-06-20",\n        "numeroCartorio": "string",\n        "subJudice": "string",\n        "valorProtesto": 41.74417682245135\n      }\n    ],\n    "dataInicial": "2009-09-21",\n    "dataFinal": "1992-02-17",\n    "quantidadeOcorrencia": 196,\n    "tipoRegistro": "string"\n  },\n  "resumoRefin": {\n    "detalhes": [\n      {\n        "cnpjCredor": "string",\n        "codigoEmpresa": "string",\n        "nomeEmpresa": "string",\n        "participante": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "valorOcorrencia": 71.79289342510664,\n        "codigoAgencia": "string",\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1959-07-27",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string"\n      },\n      {\n        "cnpjCredor": "string",\n        "codigoEmpresa": "string",\n        "nomeEmpresa": "string",\n        "participante": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "valorOcorrencia": 9272.045765342498,\n        "codigoAgencia": "string",\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1972-04-22",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string"\n      }\n    ],\n    "dataInicial": "2018-03-20",\n    "dataFinal": "1978-09-17",\n    "quantidadeOcorrencia": 5179,\n    "tipoRegistro": "string"\n  },\n  "status": "string",\n  "registrosConsultas": [\n    {\n      "dataConsulta": "1982-07-10",\n      "nomeCliente": "string",\n      "tipoRegistro": "string"\n    },\n    {\n      "dataConsulta": "2016-08-30",\n      "nomeCliente": "string",\n      "tipoRegistro": "string"\n    }\n  ],\n  "registrosGrafia": [\n    {\n      "nome": "string",\n      "tipoRegistro": "string"\n    }\n  ],\n  "atenuado": false,\n  "atenuacao": {\n    "dataHoraCalculo": "1968-05-12T20:08:26.281Z",\n    "idPessoa": 2160,\n    "documento": "string",\n    "tipoPessoa": "PJ",\n    "nivelRisco": "string",\n    "totalRendas": 7081.60294657422,\n    "totalFaturamento": 8330.39993227921,\n    "totalFinanceiro": 7115.905486291114,\n    "totalRendasComuns": 6977.25936839425,\n    "valorRbire": 5382.698476297643,\n    "valorRmpr": 8461.457529134543,\n    "quantidadeOcupacoes": 4320,\n    "quantidadeRendas": 2879,\n    "quantidadeFaturamentos": 7878,\n    "restritivos": [\n      {\n        "tipoRestritivo": "string",\n        "categoriaRestritivo": "string",\n        "valorRestritivo": 5092.691034294261,\n        "percentualRestritivo": 1887.8605050486863,\n        "atenuado": false,\n        "mensagem": "string",\n        "criterioAtenuacao": "string",\n        "totalRestritivo": 8750.472585988036\n      },\n      {\n        "tipoRestritivo": "string",\n        "categoriaRestritivo": "string",\n        "valorRestritivo": 535.5028585131294,\n        "percentualRestritivo": 3218.5680429857875,\n        "atenuado": false,\n        "mensagem": "string",\n        "criterioAtenuacao": "string",\n        "totalRestritivo": 1211.8772620717489\n      }\n    ],\n    "atenuado": true\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/serasa',
        summary: 'consultar Serasa 1',
        description:
          'Realiza consultas no SERASA através do código de solicitação\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- SERASA',
        tags: ['Restritivos', 'serasa'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'codigoSolicitacao',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "codigoSolicitacao": 6490,\n  "situacaoSerasa": "SIM",\n  "scoring": {\n    "codigoRetorno": "string",\n    "codigoScoring": "string",\n    "dataReferencia": "2005-12-27",\n    "mensagemScoring": "string",\n    "pontuacao": "string",\n    "tipoRegistro": "string"\n  },\n  "confirmacaoTelefone": {\n    "bairro": "string",\n    "cep": "string",\n    "cidade": "string",\n    "classeAssinante": "string",\n    "codigoRetorno": "string",\n    "dddTelefone": "string",\n    "documentoConfere": "string",\n    "logradouro": "string",\n    "mensagem": "string",\n    "nomeAssinante": "string",\n    "numeroTelefone": "string",\n    "tipoAssinente": "string",\n    "tipoRegistro": "string"\n  },\n  "confirmei": {\n    "dataConfirmei": "1971-01-16",\n    "dataSituacao": "2020-12-27",\n    "municipio": "string",\n    "nome": "string",\n    "nomeMaeFantasia": "string",\n    "situacao": "CANCELADA",\n    "tipoRegistro": "string",\n    "uf": "string"\n  },\n  "consultasPorBanco": {\n    "detalhes": [\n      {\n        "mes": "5003-69",\n        "quantidadeConsultas": 9624\n      },\n      {\n        "mes": "2868-98",\n        "quantidadeConsultas": 1423\n      }\n    ],\n    "tipoRegistro": "string"\n  },\n  "consultasPorEmpresa": {\n    "detalhes": [\n      {\n        "mes": "1643-27",\n        "quantidadeConsultas": 6250\n      },\n      {\n        "mes": "9879-20",\n        "quantidadeConsultas": 3660\n      }\n    ],\n    "tipoRegistro": "string"\n  },\n  "mensagemAlerta": {\n    "mensagemAlerta": "string",\n    "sequencialRegistro": "string",\n    "tipoRegistro": "string"\n  },\n  "resumoAchei": {\n    "detalhes": [\n      {\n        "cidade": "string",\n        "codigoAgencia": "string",\n        "codigoBanco": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1975-01-18",\n        "descricaoNatureza": "string",\n        "nomeBanco": "string",\n        "numeroCheque": "string",\n        "numeroContaCorrente": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "titularContaConjunta": "string",\n        "uf": "string",\n        "valorCheque": 1302.3561844839437\n      },\n      {\n        "cidade": "string",\n        "codigoAgencia": "string",\n        "codigoBanco": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1987-02-20",\n        "descricaoNatureza": "string",\n        "nomeBanco": "string",\n        "numeroCheque": "string",\n        "numeroContaCorrente": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "titularContaConjunta": "string",\n        "uf": "string",\n        "valorCheque": 8635.729387498257\n      }\n    ],\n    "dataInicial": "1974-09-06",\n    "dataFinal": "2008-05-31",\n    "quantidadeOcorrencia": 5825,\n    "tipoRegistro": "string"\n  },\n  "resumoAcoes": {\n    "detalhes": [\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1980-12-26",\n        "descricaoNatureza": "string",\n        "numeroDistribuidor": "string",\n        "numeroVaraCivil": "string",\n        "praca": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "valorAcao": 5693.522256661729\n      },\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2008-02-24",\n        "descricaoNatureza": "string",\n        "numeroDistribuidor": "string",\n        "numeroVaraCivil": "string",\n        "praca": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "valorAcao": 3050.213697883396\n      }\n    ],\n    "dataInicial": "1994-05-09",\n    "dataFinal": "1972-03-22",\n    "quantidadeOcorrencia": 2242,\n    "tipoRegistro": "string"\n  },\n  "resumoCCF": {\n    "detalhes": [\n      {\n        "cidade": "string",\n        "codigoAgencia": "string",\n        "codigoBanco": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2026-03-08",\n        "descricaoNatureza": "string",\n        "nomeBanco": "string",\n        "praca": "string",\n        "quantidadeCheques": 1020,\n        "tipoRegistro": "string",\n        "uf": "string"\n      },\n      {\n        "cidade": "string",\n        "codigoAgencia": "string",\n        "codigoBanco": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2001-10-27",\n        "descricaoNatureza": "string",\n        "nomeBanco": "string",\n        "praca": "string",\n        "quantidadeCheques": 368,\n        "tipoRegistro": "string",\n        "uf": "string"\n      }\n    ],\n    "dataInicial": "1949-01-14",\n    "dataFinal": "1980-04-25",\n    "quantidadeOcorrencia": 6264,\n    "tipoRegistro": "string"\n  },\n  "resumoConvemDevedores": {\n    "detalhes": [\n      {\n        "cnpjCredor": "string",\n        "codigoNatureza": "string",\n        "contrato": "string",\n        "dataOcorrencia": "1966-05-02",\n        "descricaoNatureza": "string",\n        "nomeInstituicao": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "valorOcorrencia": 5973.585591679508\n      },\n      {\n        "cnpjCredor": "string",\n        "codigoNatureza": "string",\n        "contrato": "string",\n        "dataOcorrencia": "2014-08-09",\n        "descricaoNatureza": "string",\n        "nomeInstituicao": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "valorOcorrencia": 7440.462948684338\n      }\n    ],\n    "dataInicial": "1997-02-17",\n    "dataFinal": "2001-12-20",\n    "quantidadeOcorrencia": 903,\n    "tipoRegistro": "string"\n  },\n  "resumoFalenciaConcordata": {\n    "detalhes": [\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1981-04-06",\n        "descricaoNatureza": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "numeroVaraCivil": "string"\n      },\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2007-05-30",\n        "descricaoNatureza": "string",\n        "praca": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "numeroVaraCivil": "string"\n      }\n    ],\n    "dataInicial": "1987-04-06",\n    "dataFinal": "2025-12-27",\n    "quantidadeOcorrencia": 718,\n    "tipoRegistro": "string"\n  },\n  "resumoParticipanteEmpresaFalida": {\n    "detalhes": [\n      {\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2020-08-11",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "descricaoQualificacao": "string",\n        "codigoQualificacao": "string",\n        "nomeEmpresa": "string",\n        "numeroVaraCivil": "string",\n        "cnpjEmpresa": "string"\n      },\n      {\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1981-06-24",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "descricaoQualificacao": "string",\n        "codigoQualificacao": "string",\n        "nomeEmpresa": "string",\n        "numeroVaraCivil": "string",\n        "cnpjEmpresa": "string"\n      }\n    ],\n    "dataInicial": "1959-10-04",\n    "dataFinal": "2012-12-27",\n    "quantidadeOcorrencia": 8605,\n    "tipoRegistro": "string"\n  },\n  "resumoPefin": {\n    "detalhes": [\n      {\n        "cnpjCredor": "string",\n        "contrato": "string",\n        "nomeCredor": "string",\n        "nomeInstituicao": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "valorOcorrencia": 8196.592763459368,\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1969-01-27",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string"\n      },\n      {\n        "cnpjCredor": "string",\n        "contrato": "string",\n        "nomeCredor": "string",\n        "nomeInstituicao": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "valorOcorrencia": 5239.483569012291,\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1955-10-19",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string"\n      }\n    ],\n    "dataInicial": "1984-10-21",\n    "dataFinal": "1981-01-28",\n    "quantidadeOcorrencia": 1172,\n    "tipoRegistro": "string"\n  },\n  "resumoProtestos": {\n    "detalhes": [\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1958-09-10",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string",\n        "dataCarta": "2001-12-25",\n        "numeroCartorio": "string",\n        "subJudice": "string",\n        "valorProtesto": 3451.584935413757\n      },\n      {\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "2018-02-27",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string",\n        "dataCarta": "1970-06-20",\n        "numeroCartorio": "string",\n        "subJudice": "string",\n        "valorProtesto": 41.74417682245135\n      }\n    ],\n    "dataInicial": "2009-09-21",\n    "dataFinal": "1992-02-17",\n    "quantidadeOcorrencia": 196,\n    "tipoRegistro": "string"\n  },\n  "resumoRefin": {\n    "detalhes": [\n      {\n        "cnpjCredor": "string",\n        "codigoEmpresa": "string",\n        "nomeEmpresa": "string",\n        "participante": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "valorOcorrencia": 71.79289342510664,\n        "codigoAgencia": "string",\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1959-07-27",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string"\n      },\n      {\n        "cnpjCredor": "string",\n        "codigoEmpresa": "string",\n        "nomeEmpresa": "string",\n        "participante": "string",\n        "principal": "string",\n        "subJudice": "string",\n        "valorOcorrencia": 9272.045765342498,\n        "codigoAgencia": "string",\n        "cidade": "string",\n        "codigoNatureza": "string",\n        "dataOcorrencia": "1972-04-22",\n        "descricaoNatureza": "string",\n        "tipoRegistro": "string",\n        "uf": "string",\n        "praca": "string"\n      }\n    ],\n    "dataInicial": "2018-03-20",\n    "dataFinal": "1978-09-17",\n    "quantidadeOcorrencia": 5179,\n    "tipoRegistro": "string"\n  },\n  "status": "string",\n  "registrosConsultas": [\n    {\n      "dataConsulta": "1982-07-10",\n      "nomeCliente": "string",\n      "tipoRegistro": "string"\n    },\n    {\n      "dataConsulta": "2016-08-30",\n      "nomeCliente": "string",\n      "tipoRegistro": "string"\n    }\n  ],\n  "registrosGrafia": [\n    {\n      "nome": "string",\n      "tipoRegistro": "string"\n    }\n  ],\n  "atenuado": false,\n  "atenuacao": {\n    "dataHoraCalculo": "1968-05-12T20:08:26.281Z",\n    "idPessoa": 2160,\n    "documento": "string",\n    "tipoPessoa": "PJ",\n    "nivelRisco": "string",\n    "totalRendas": 7081.60294657422,\n    "totalFaturamento": 8330.39993227921,\n    "totalFinanceiro": 7115.905486291114,\n    "totalRendasComuns": 6977.25936839425,\n    "valorRbire": 5382.698476297643,\n    "valorRmpr": 8461.457529134543,\n    "quantidadeOcupacoes": 4320,\n    "quantidadeRendas": 2879,\n    "quantidadeFaturamentos": 7878,\n    "restritivos": [\n      {\n        "tipoRestritivo": "string",\n        "categoriaRestritivo": "string",\n        "valorRestritivo": 5092.691034294261,\n        "percentualRestritivo": 1887.8605050486863,\n        "atenuado": false,\n        "mensagem": "string",\n        "criterioAtenuacao": "string",\n        "totalRestritivo": 8750.472585988036\n      },\n      {\n        "tipoRestritivo": "string",\n        "categoriaRestritivo": "string",\n        "valorRestritivo": 535.5028585131294,\n        "percentualRestritivo": 3218.5680429857875,\n        "atenuado": false,\n        "mensagem": "string",\n        "criterioAtenuacao": "string",\n        "totalRestritivo": 1211.8772620717489\n      }\n    ],\n    "atenuado": true\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/certidoes/tst-cndt/{documento}',
        summary: 'tst Cndt',
        description:
          'Realizar consulta: Tribunal Superior do Trabalho - Certidão Negativa de Débitos Trabalhistas (CNDT)',
        tags: ['Restritivos', 'certidoes', 'tst-cndt'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "situacaoCertidao": "NAO_CONSULTADO",\n  "dadosSobreConsulta": {\n    "tipoConsulta": "string",\n    "idPrestadorServico": "string",\n    "idConsultaApi": "string",\n    "mensagem": "string"\n  },\n  "dadosResposta": {},\n  "dadosArquivo": {\n    "extensao": "string",\n    "nome": "string",\n    "conteudoBase64": "string"\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/certidoes/cnd-embargos-ibama/{documento}',
        summary: 'cnd Embargos Ibama',
        description: 'Realizar consulta: Certidao de Embrgos Ibama',
        tags: ['Restritivos', 'certidoes', 'cnd-embargos-ibama'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "situacaoCertidao": "NAO_CONSULTADO",\n  "dadosSobreConsulta": {\n    "tipoConsulta": "string",\n    "idPrestadorServico": "string",\n    "idConsultaApi": "string",\n    "mensagem": "string"\n  },\n  "dadosResposta": {},\n  "dadosArquivo": {\n    "extensao": "string",\n    "nome": "string",\n    "conteudoBase64": "string"\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/certidoes/cef-reg-fgts/{documento}',
        summary: 'cef Reg Fgts',
        description:
          'Realizar consulta: Consulta Regularidade FGTS - Caixa Econômica Federal',
        tags: ['Restritivos', 'certidoes', 'cef-reg-fgts'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "situacaoCertidao": "NAO_CONSULTADO",\n  "dadosSobreConsulta": {\n    "tipoConsulta": "string",\n    "idPrestadorServico": "string",\n    "idConsultaApi": "string",\n    "mensagem": "string"\n  },\n  "dadosResposta": {},\n  "dadosArquivo": {\n    "extensao": "string",\n    "nome": "string",\n    "conteudoBase64": "string"\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/certidoes/rfb-cafir/{cib}',
        summary: 'frb Cafir',
        description:
          'Realizar consulta: Receita Federal - Certidão Negativa de Débitos (CND)',
        tags: ['Restritivos', 'certidoes', 'rfb-cafir'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'cib',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "situacaoCertidao": "NAO_CONSULTADO",\n  "dadosSobreConsulta": {\n    "tipoConsulta": "string",\n    "idPrestadorServico": "string",\n    "idConsultaApi": "string",\n    "mensagem": "string"\n  },\n  "dadosResposta": {},\n  "dadosArquivo": {\n    "extensao": "string",\n    "nome": "string",\n    "conteudoBase64": "string"\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/certidoes/rfb-cnd/{documento}',
        summary: 'frb Cnd',
        description:
          'Realizar consulta: Receita Federal - Certidão Negativa de Débitos (CND)',
        tags: ['Restritivos', 'certidoes', 'rfb-cnd'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "situacaoCertidao": "NAO_CONSULTADO",\n  "dadosSobreConsulta": {\n    "tipoConsulta": "string",\n    "idPrestadorServico": "string",\n    "idConsultaApi": "string",\n    "mensagem": "string"\n  },\n  "dadosResposta": {},\n  "dadosArquivo": {\n    "extensao": "string",\n    "nome": "string",\n    "conteudoBase64": "string"\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/caf/recuperar/{codigoConsulta}',
        summary: 'recuperar Caf Pessoa Fisica',
        description:
          'Recupera uma consulta pelo Codigo\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- CAF_CONSULTA',
        tags: ['Restritivos', 'caf', 'recuperar'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'codigoConsulta',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example: '{}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/caf/pessoa-fisica/{cpf}',
        summary: 'consuta Caf Pessoa Fisica',
        description:
          'Realiza consultas ao dados da CAF para Possoa Física\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- CAF_CONSULTA',
        tags: ['Restritivos', 'caf', 'pessoa-fisica'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'cpf',
            in: 'path',
            required: true,
            type: 'string',
            description:
              'Cpf do titular da informação para consulta de dados compartilhados na RFB.',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "tipoRetornoConsulta": "string",\n  "codigo": 8800,\n  "id": "string",\n  "possuiMaoObraContratada": false,\n  "dadosCadastro": {\n    "idPessoa": 9230,\n    "nome": "string",\n    "idFiscal": "string"\n  },\n  "dataCriacao": "string",\n  "dataAtivacao": "string",\n  "dataValidade": "string",\n  "dataInativacao": "string",\n  "situacao": {\n    "codigo": "string",\n    "descricao": "string"\n  },\n  "atividadeprincipalUFPA": {\n    "codigo": "string",\n    "descricao": "string"\n  },\n  "caracterizacaoArea": {\n    "codigo": "string",\n    "descricao": "string"\n  },\n  "caf": {\n    "numeroCaf": "string",\n    "dataEmissao": "string",\n    "emissor": {\n      "nome": "string",\n      "cpf": "string",\n      "dataNascimento": "string"\n    },\n    "entidadeEmissora": {\n      "cnpj": "string",\n      "razaoSocial": "string"\n    }\n  },\n  "enquadramentoPronaf": "string",\n  "membros": [\n    {\n      "id": "string",\n      "nome": "string",\n      "cpf": "string",\n      "dataNascimento": "string",\n      "ufNascimento": "string",\n      "municipioNascimento": {\n        "siglaUf": "string",\n        "nome": "string",\n        "codigoMunicipio": "string"\n      },\n      "nomeMae": "string",\n      "email": "string",\n      "emancipado": true,\n      "codigoSipra": "string",\n      "tipoMembro": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "escolaridade": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "estadoCivil": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "etnia": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "nacionalidade": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "sexo": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "trabalhaUfpr": true,\n      "dataInicioMaoDeObra": "string",\n      "dataFimMaoDeObra": "string",\n      "dataCriacao": "string"\n    },\n    {\n      "id": "string",\n      "nome": "string",\n      "cpf": "string",\n      "dataNascimento": "string",\n      "ufNascimento": "string",\n      "municipioNascimento": {\n        "siglaUf": "string",\n        "nome": "string",\n        "codigoMunicipio": "string"\n      },\n      "nomeMae": "string",\n      "email": "string",\n      "emancipado": false,\n      "codigoSipra": "string",\n      "tipoMembro": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "escolaridade": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "estadoCivil": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "etnia": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "nacionalidade": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "sexo": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "trabalhaUfpr": true,\n      "dataInicioMaoDeObra": "string",\n      "dataFimMaoDeObra": "string",\n      "dataCriacao": "string"\n    }\n  ],\n  "membrosExcluidos": [\n    {\n      "id": "string",\n      "nome": "string",\n      "cpf": "string",\n      "dataNascimento": "string",\n      "ufNascimento": "string",\n      "municipioNascimento": {\n        "siglaUf": "string",\n        "nome": "string",\n        "codigoMunicipio": "string"\n      },\n      "nomeMae": "string",\n      "email": "string",\n      "emancipado": false,\n      "codigoSipra": "string",\n      "tipoMembro": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "escolaridade": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "estadoCivil": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "etnia": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "nacionalidade": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "sexo": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "trabalhaUfpr": false,\n      "dataInicioMaoDeObra": "string",\n      "dataFimMaoDeObra": "string",\n      "dataCriacao": "string"\n    },\n    {\n      "id": "string",\n      "nome": "string",\n      "cpf": "string",\n      "dataNascimento": "string",\n      "ufNascimento": "string",\n      "municipioNascimento": {\n        "siglaUf": "string",\n        "nome": "string",\n        "codigoMunicipio": "string"\n      },\n      "nomeMae": "string",\n      "email": "string",\n      "emancipado": false,\n      "codigoSipra": "string",\n      "tipoMembro": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "escolaridade": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "estadoCivil": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "etnia": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "nacionalidade": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "sexo": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "trabalhaUfpr": false,\n      "dataInicioMaoDeObra": "string",\n      "dataFimMaoDeObra": "string",\n      "dataCriacao": "string"\n    }\n  ],\n  "endereco": {\n    "id": "string",\n    "uf": "string",\n    "bairro": "string",\n    "logradouro": "string",\n    "numero": "string",\n    "cep": "string",\n    "complemento": "string",\n    "codigoMunicipio": "string",\n    "municipio": {\n      "codigoMunicipio": "string",\n      "nome": "string",\n      "siglaUf": "string"\n    }\n  },\n  "areas": [\n    {\n      "id": "string",\n      "tamanho": "string",\n      "ativo": false,\n      "latitude": "string",\n      "longitude": "string",\n      "imovelPrincipal": false,\n      "uf": "string",\n      "municipio": {\n        "codigo": "string",\n        "nome": "string",\n        "siglaUf": "string"\n      },\n      "tipo": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "unidadeMedida": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "condicaoPosse": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "localizacao": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "responsavel": {\n        "nome": "string",\n        "cpf": "string"\n      }\n    },\n    {\n      "id": "string",\n      "tamanho": "string",\n      "ativo": false,\n      "latitude": "string",\n      "longitude": "string",\n      "imovelPrincipal": false,\n      "uf": "string",\n      "municipio": {\n        "codigo": "string",\n        "nome": "string",\n        "siglaUf": "string"\n      },\n      "tipo": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "unidadeMedida": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "condicaoPosse": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "localizacao": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "responsavel": {\n        "nome": "string",\n        "cpf": "string"\n      }\n    }\n  ],\n  "maoDeObraContratada": [\n    {\n      "id": "string",\n      "nome": "string",\n      "cpf": "string",\n      "dataNascimento": "string"\n    },\n    {\n      "id": "string",\n      "nome": "string",\n      "cpf": "string",\n      "dataNascimento": "string"\n    }\n  ],\n  "rendas": [\n    {\n      "id": "string",\n      "rendaEstimada": 160.3892977218002,\n      "rendaAuferida": 2082.97836765004,\n      "tipoRenda": "string",\n      "origemRenda": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "produto": "string",\n      "responsavel": {\n        "nome": "string",\n        "cpf": "string"\n      },\n      "producaoAgroecologica": false,\n      "percentualRebate": 856.8428275551998\n    },\n    {\n      "id": "string",\n      "rendaEstimada": 839.6271498838381,\n      "rendaAuferida": 590.5277994671876,\n      "tipoRenda": "string",\n      "origemRenda": {\n        "codigo": "string",\n        "descricao": "string"\n      },\n      "produto": "string",\n      "responsavel": {\n        "nome": "string",\n        "cpf": "string"\n      },\n      "producaoAgroecologica": true,\n      "percentualRebate": 5719.1446755975785\n    }\n  ],\n  "informacoesAdicionais": {\n    "codigoBeneficiarioSicor": 4945,\n    "tipoBeneficiario": "AQUICULTOR",\n    "exigeImovel": false,\n    "exigeGleba": false,\n    "exigeAnaliseSocioAmbiental": false\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/caf/pessoa-juridica/{cnpj}',
        summary: 'consuta Caf Pessoa Juridica',
        description:
          'Realiza consultas ao dados da CAF para Possoa Jurídica\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- CAF_CONSULTA',
        tags: ['Restritivos', 'caf', 'pessoa-juridica'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'cnpj',
            in: 'path',
            required: true,
            type: 'string',
            description: 'CNPJ da empresa com dados compartilhados na RFB.',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "codigo": 4330,\n  "id": "string",\n  "cnpj": "string",\n  "dadosCadastro": {\n    "idPessoa": 4480,\n    "nome": "string",\n    "idFiscal": "string"\n  },\n  "cnaePrincipal": {\n    "codigo": "string",\n    "descricao": "string"\n  },\n  "email": "string",\n  "telefones": [\n    {\n      "numero": "string"\n    },\n    {\n      "numero": "string"\n    }\n  ],\n  "responsavelTecnico": "string",\n  "naturezaJuridica": {\n    "codigo": "string",\n    "descricao": "string"\n  },\n  "razaoSocial": "string",\n  "nomeFantasia": "string",\n  "dataConstituicao": "string",\n  "dataInscricao": "string",\n  "dataValidade": "string",\n  "situacao": "string",\n  "tipo": "string",\n  "endereco": {\n    "id": "string",\n    "uf": "string",\n    "bairro": "string",\n    "logradouro": "string",\n    "numero": "string",\n    "cep": "string",\n    "complemento": "string",\n    "codigoMunicipio": "string",\n    "municipio": {\n      "codigoMunicipio": "string",\n      "nome": "string",\n      "siglaUf": "string"\n    }\n  },\n  "representanteLegal": {\n    "nome": "string",\n    "cpf": "string",\n    "dataNascimento": "string"\n  },\n  "entidadeEmissora": {\n    "cnpj": "string",\n    "razaoSocial": "string"\n  },\n  "informacoesAdicionais": {\n    "codigoBeneficiarioSicor": 874,\n    "tipoBeneficiario": "INDIGENA",\n    "exigeImovel": false,\n    "exigeGleba": false,\n    "exigeAnaliseSocioAmbiental": true\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/cadin/{documento}',
        summary: 'consultar Cadin',
        description:
          'Realiza consulta no serviço do Cadin\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- CADIN',
        tags: ['Restritivos', 'cadin'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "codigoSolicitacao": 1883,\n  "situacaoCadin": "NAO_CONSULTADO",\n  "informacoesCadin": [\n    {\n      "codigo": "string",\n      "nome": "string",\n      "dataHora": "1997-11-09T17:35:54.206Z"\n    },\n    {\n      "codigo": "string",\n      "nome": "string",\n      "dataHora": "2010-01-27T01:29:15.869Z"\n    }\n  ]\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/nfe/{chave}',
        summary: 'consulta Nfe',
        description:
          'Realiza consultas ao serviço de nota fiscal eletrônica da SERPRO',
        tags: ['Restritivos', 'nfe'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'chave',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "idConsulta": 858,\n  "nfeProc": {\n    "protNFe": {\n      "infProt": {\n        "chNFe": "string",\n        "getcStat": 1793,\n        "dhRecbto": "string",\n        "getnProt": 1423,\n        "digVal": "string",\n        "getxMotivo": "string"\n      }\n    },\n    "versao": 5606.827320704353,\n    "NFe": {\n      "infNFe": {\n        "infAdic": {\n          "infCpl": "string"\n        },\n        "det": [\n          {\n            "nItem": 9146,\n            "prod": {\n              "getcEAN": "string",\n              "getcProd": "string",\n              "getqCom": 8538.251223586674,\n              "getcEANTrib": "string",\n              "getvUnTrib": 2825.9366054949073,\n              "getqTrib": 2882.8708094708322,\n              "getvProd": 6395.0385951499,\n              "getxProd": "string",\n              "getvUnCom": 1200.3426845187494,\n              "indTot": 3725,\n              "getuTrib": "string",\n              "getuCom": "string",\n              "NCM": 3569,\n              "CFOP": 7387,\n              "CEST": 450\n            },\n            "imposto": {\n              "getvTotTrib": 3974.1958858161784,\n              "PIS": {\n                "PISAliq": {\n                  "getvPIS": 8320.771400066136,\n                  "getvBC": 578.5473170290944,\n                  "getpPIS": 1040.2280567238565,\n                  "CST": "string"\n                }\n              },\n              "COFINS": {\n                "COFINSAliq": {\n                  "getvCOFINS": 6971.975040913162,\n                  "getvBC": 8435.369682561457,\n                  "getpCOFINS": 1735.1959397524274,\n                  "CST": "string"\n                }\n              },\n              "ICMS": {\n                "ICMS00": {\n                  "modBC": 9473,\n                  "orig": 587,\n                  "getvBC": 4573.907539340194,\n                  "getvICMS": 8309.560368416101,\n                  "getpICMS": 5213.953507242143,\n                  "CST": "string"\n                }\n              }\n            }\n          },\n          {\n            "nItem": 7093,\n            "prod": {\n              "getcEAN": "string",\n              "getcProd": "string",\n              "getqCom": 7031.154700660636,\n              "getcEANTrib": "string",\n              "getvUnTrib": 6238.24331299919,\n              "getqTrib": 3689.512941003056,\n              "getvProd": 7282.207388923013,\n              "getxProd": "string",\n              "getvUnCom": 4246.506777930975,\n              "indTot": 2819,\n              "getuTrib": "string",\n              "getuCom": "string",\n              "NCM": 2386,\n              "CFOP": 5071,\n              "CEST": 5104\n            },\n            "imposto": {\n              "getvTotTrib": 1865.8325724897095,\n              "PIS": {\n                "PISAliq": {\n                  "getvPIS": 486.17311024239496,\n                  "getvBC": 2411.302926918927,\n                  "getpPIS": 8846.015790026795,\n                  "CST": "string"\n                }\n              },\n              "COFINS": {\n                "COFINSAliq": {\n                  "getvCOFINS": 3381.427081024797,\n                  "getvBC": 6283.009752340403,\n                  "getpCOFINS": 9233.064358567211,\n                  "CST": "string"\n                }\n              },\n              "ICMS": {\n                "ICMS00": {\n                  "modBC": 510,\n                  "orig": 6985,\n                  "getvBC": 8549.532017099862,\n                  "getvICMS": 7814.6043893602455,\n                  "getpICMS": 1684.4176234022868,\n                  "CST": "string"\n                }\n              }\n            }\n          }\n        ],\n        "pag": {\n          "detPag": [\n            {\n              "vPag": 9093.751062519474,\n              "tPag": "OUTROS",\n              "indPag": "PAGAMENTO_A_PRAZO"\n            },\n            {\n              "vPag": 2167.894389008619,\n              "tPag": "VALE_ALIMENTACAO",\n              "indPag": "PAGAMENTO_A_PRAZO"\n            }\n          ]\n        },\n        "total": {\n          "ICMSTot": {\n            "getvCOFINS": 1940.9853232426467,\n            "getvBCST": 8691.633923884627,\n            "getvICMSDeson": 7673.590668048041,\n            "getvProd": 5382.800266243085,\n            "getvSeg": 3185.894519714022,\n            "getvNF": 1456.326924013327,\n            "getvTotTrib": 742.0648645988348,\n            "getvPIS": 3344.3274511456634,\n            "getvBC": 6343.71262727216,\n            "getvST": 9464.479071303005,\n            "getvICMS": 8449.35160675928,\n            "getvII": 7744.855596295232,\n            "getvDesc": 6580.636557568146,\n            "getvOutro": 1428.2873675285211,\n            "getvIPI": 4449.8229610718,\n            "getvFrete": 4591.259295285796\n          }\n        },\n        "cobr": {\n          "dup": [\n            {\n              "getdVenc": "string",\n              "getnDup": "string",\n              "getvDup": 3058.896758793365\n            },\n            {\n              "getdVenc": "string",\n              "getnDup": "string",\n              "getvDup": 4262.02244508119\n            }\n          ]\n        },\n        "Id": "string",\n        "ide": {\n          "tpNF": 559,\n          "mod": 8084,\n          "indPres": 7723,\n          "tpImp": 4799,\n          "getnNF": 4510,\n          "getcMunFG": 1451,\n          "procEmi": 2652,\n          "finNFe": 2609,\n          "dhEmi": "string",\n          "tpAmb": 6582,\n          "indFinal": 764,\n          "idDest": 4284,\n          "tpEmis": 1461,\n          "getcDV": 3000,\n          "getcUF": 5167,\n          "serie": 1073,\n          "natOp": "string",\n          "getcNF": "string",\n          "verProc": "string",\n          "indPag": 2642\n        },\n        "emit": {\n          "getxNome": "string",\n          "getxFant": "string",\n          "enderEmit": {\n            "fone": 5274,\n            "getxPais": "string",\n            "getcPais": 1599,\n            "getxLgr": "string",\n            "getxMun": "string",\n            "nro": "string",\n            "getcMun": 3932,\n            "getxBairro": "string",\n            "UF": "string",\n            "CEP": "string"\n          },\n          "cnae": "string",\n          "CNPJ": "string",\n          "CPF": "string",\n          "IE": "string",\n          "IM": "string",\n          "CRT": 205\n        },\n        "dest": {\n          "getxNome": "string",\n          "enderDest": {\n            "fone": 6588,\n            "getxPais": "string",\n            "getcPais": 552,\n            "getxLgr": "string",\n            "getxMun": "string",\n            "nro": "string",\n            "getcMun": 9159,\n            "getxBairro": "string",\n            "UF": "string",\n            "CEP": "string"\n          },\n          "email": "string",\n          "indIEDest": "NAO_CONTRIBUINTE",\n          "CNPJ": "string",\n          "CPF": "string"\n        },\n        "transp": {\n          "modFrete": 1806,\n          "vol": [\n            {\n              "pesoL": 4884.472295216967,\n              "esp": "string",\n              "getqVol": 6741.41093513416,\n              "pesoB": 6041.030146095825\n            },\n            {\n              "pesoL": 3256.9960593921555,\n              "esp": "string",\n              "getqVol": 4000.1457588911426,\n              "pesoB": 9549.22081692881\n            }\n          ],\n          "transporta": {\n            "getxNome": "string"\n          }\n        }\n      }\n    }\n  },\n  "procEventoNFe": [\n    {\n      "evento": {\n        "infEvento": {\n          "cnpj": 7974,\n          "cOrgao": "string",\n          "tpAmb": 1180,\n          "CNPJ": 9049,\n          "chNFe": "string",\n          "dhEvento": "string",\n          "tpEvento": 869,\n          "nSeqEvento": "string",\n          "verEvento": 4413,\n          "detEvento": {\n            "descEvento": "string",\n            "nProt": "string",\n            "xJust": "string",\n            "_versao": "string"\n          },\n          "Id": "string"\n        }\n      },\n      "retEvento": {\n        "infEvento": {\n          "cpfdest": "string",\n          "verAplic": "string",\n          "cOrgao": "string",\n          "cStat": "string",\n          "xMotivo": "string",\n          "chNFe": "string",\n          "tpEvento": "string",\n          "xEvento": "string",\n          "nSeqEvento": "string",\n          "CPFDest": "string",\n          "dhRegEvento": "string",\n          "nProt": "string"\n        }\n      }\n    },\n    {\n      "evento": {\n        "infEvento": {\n          "cnpj": 4212,\n          "cOrgao": "string",\n          "tpAmb": 1641,\n          "CNPJ": 8722,\n          "chNFe": "string",\n          "dhEvento": "string",\n          "tpEvento": 5684,\n          "nSeqEvento": "string",\n          "verEvento": 9090,\n          "detEvento": {\n            "descEvento": "string",\n            "nProt": "string",\n            "xJust": "string",\n            "_versao": "string"\n          },\n          "Id": "string"\n        }\n      },\n      "retEvento": {\n        "infEvento": {\n          "cpfdest": "string",\n          "verAplic": "string",\n          "cOrgao": "string",\n          "cStat": "string",\n          "xMotivo": "string",\n          "chNFe": "string",\n          "tpEvento": "string",\n          "xEvento": "string",\n          "nSeqEvento": "string",\n          "CPFDest": "string",\n          "dhRegEvento": "string",\n          "nProt": "string"\n        }\n      }\n    }\n  ]\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/v1/nfe/chave-pdf-base64',
        summary: 'consulta Chave Nfe Base64',
        description:
          'Recebe um pdf de uma nota fiscal eletronica aplica OCR e IA e devolve a chave da nota fiscal.',
        tags: ['Restritivos', 'nfe', 'chave-pdf-base64'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
        ],
        requestBody: '{\n  "base64Source": "string"\n}',
        responses: [
          {
            statusCode: '201',
            description: 'OK',
            example: 'string',
          },
          {
            statusCode: '202',
            description:
              'Requisição aceita, mas ainda não processada completamente',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/v1/nfe/pdf-base64',
        summary: 'consulta Nfe Base64',
        description:
          'Recebe um pdf de uma nota fiscal eletronica aplica OCR e IA para pegar a chave da nota fiscal eletronica e consulta a nota da SERPRO.',
        tags: ['Restritivos', 'nfe', 'pdf-base64'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
        ],
        requestBody: '{\n  "base64Source": "string"\n}',
        responses: [
          {
            statusCode: '201',
            description: 'OK',
            example:
              '{\n  "idConsulta": 858,\n  "nfeProc": {\n    "protNFe": {\n      "infProt": {\n        "chNFe": "string",\n        "getcStat": 1793,\n        "dhRecbto": "string",\n        "getnProt": 1423,\n        "digVal": "string",\n        "getxMotivo": "string"\n      }\n    },\n    "versao": 5606.827320704353,\n    "NFe": {\n      "infNFe": {\n        "infAdic": {\n          "infCpl": "string"\n        },\n        "det": [\n          {\n            "nItem": 9146,\n            "prod": {\n              "getcEAN": "string",\n              "getcProd": "string",\n              "getqCom": 8538.251223586674,\n              "getcEANTrib": "string",\n              "getvUnTrib": 2825.9366054949073,\n              "getqTrib": 2882.8708094708322,\n              "getvProd": 6395.0385951499,\n              "getxProd": "string",\n              "getvUnCom": 1200.3426845187494,\n              "indTot": 3725,\n              "getuTrib": "string",\n              "getuCom": "string",\n              "NCM": 3569,\n              "CFOP": 7387,\n              "CEST": 450\n            },\n            "imposto": {\n              "getvTotTrib": 3974.1958858161784,\n              "PIS": {\n                "PISAliq": {\n                  "getvPIS": 8320.771400066136,\n                  "getvBC": 578.5473170290944,\n                  "getpPIS": 1040.2280567238565,\n                  "CST": "string"\n                }\n              },\n              "COFINS": {\n                "COFINSAliq": {\n                  "getvCOFINS": 6971.975040913162,\n                  "getvBC": 8435.369682561457,\n                  "getpCOFINS": 1735.1959397524274,\n                  "CST": "string"\n                }\n              },\n              "ICMS": {\n                "ICMS00": {\n                  "modBC": 9473,\n                  "orig": 587,\n                  "getvBC": 4573.907539340194,\n                  "getvICMS": 8309.560368416101,\n                  "getpICMS": 5213.953507242143,\n                  "CST": "string"\n                }\n              }\n            }\n          },\n          {\n            "nItem": 7093,\n            "prod": {\n              "getcEAN": "string",\n              "getcProd": "string",\n              "getqCom": 7031.154700660636,\n              "getcEANTrib": "string",\n              "getvUnTrib": 6238.24331299919,\n              "getqTrib": 3689.512941003056,\n              "getvProd": 7282.207388923013,\n              "getxProd": "string",\n              "getvUnCom": 4246.506777930975,\n              "indTot": 2819,\n              "getuTrib": "string",\n              "getuCom": "string",\n              "NCM": 2386,\n              "CFOP": 5071,\n              "CEST": 5104\n            },\n            "imposto": {\n              "getvTotTrib": 1865.8325724897095,\n              "PIS": {\n                "PISAliq": {\n                  "getvPIS": 486.17311024239496,\n                  "getvBC": 2411.302926918927,\n                  "getpPIS": 8846.015790026795,\n                  "CST": "string"\n                }\n              },\n              "COFINS": {\n                "COFINSAliq": {\n                  "getvCOFINS": 3381.427081024797,\n                  "getvBC": 6283.009752340403,\n                  "getpCOFINS": 9233.064358567211,\n                  "CST": "string"\n                }\n              },\n              "ICMS": {\n                "ICMS00": {\n                  "modBC": 510,\n                  "orig": 6985,\n                  "getvBC": 8549.532017099862,\n                  "getvICMS": 7814.6043893602455,\n                  "getpICMS": 1684.4176234022868,\n                  "CST": "string"\n                }\n              }\n            }\n          }\n        ],\n        "pag": {\n          "detPag": [\n            {\n              "vPag": 9093.751062519474,\n              "tPag": "OUTROS",\n              "indPag": "PAGAMENTO_A_PRAZO"\n            },\n            {\n              "vPag": 2167.894389008619,\n              "tPag": "VALE_ALIMENTACAO",\n              "indPag": "PAGAMENTO_A_PRAZO"\n            }\n          ]\n        },\n        "total": {\n          "ICMSTot": {\n            "getvCOFINS": 1940.9853232426467,\n            "getvBCST": 8691.633923884627,\n            "getvICMSDeson": 7673.590668048041,\n            "getvProd": 5382.800266243085,\n            "getvSeg": 3185.894519714022,\n            "getvNF": 1456.326924013327,\n            "getvTotTrib": 742.0648645988348,\n            "getvPIS": 3344.3274511456634,\n            "getvBC": 6343.71262727216,\n            "getvST": 9464.479071303005,\n            "getvICMS": 8449.35160675928,\n            "getvII": 7744.855596295232,\n            "getvDesc": 6580.636557568146,\n            "getvOutro": 1428.2873675285211,\n            "getvIPI": 4449.8229610718,\n            "getvFrete": 4591.259295285796\n          }\n        },\n        "cobr": {\n          "dup": [\n            {\n              "getdVenc": "string",\n              "getnDup": "string",\n              "getvDup": 3058.896758793365\n            },\n            {\n              "getdVenc": "string",\n              "getnDup": "string",\n              "getvDup": 4262.02244508119\n            }\n          ]\n        },\n        "Id": "string",\n        "ide": {\n          "tpNF": 559,\n          "mod": 8084,\n          "indPres": 7723,\n          "tpImp": 4799,\n          "getnNF": 4510,\n          "getcMunFG": 1451,\n          "procEmi": 2652,\n          "finNFe": 2609,\n          "dhEmi": "string",\n          "tpAmb": 6582,\n          "indFinal": 764,\n          "idDest": 4284,\n          "tpEmis": 1461,\n          "getcDV": 3000,\n          "getcUF": 5167,\n          "serie": 1073,\n          "natOp": "string",\n          "getcNF": "string",\n          "verProc": "string",\n          "indPag": 2642\n        },\n        "emit": {\n          "getxNome": "string",\n          "getxFant": "string",\n          "enderEmit": {\n            "fone": 5274,\n            "getxPais": "string",\n            "getcPais": 1599,\n            "getxLgr": "string",\n            "getxMun": "string",\n            "nro": "string",\n            "getcMun": 3932,\n            "getxBairro": "string",\n            "UF": "string",\n            "CEP": "string"\n          },\n          "cnae": "string",\n          "CNPJ": "string",\n          "CPF": "string",\n          "IE": "string",\n          "IM": "string",\n          "CRT": 205\n        },\n        "dest": {\n          "getxNome": "string",\n          "enderDest": {\n            "fone": 6588,\n            "getxPais": "string",\n            "getcPais": 552,\n            "getxLgr": "string",\n            "getxMun": "string",\n            "nro": "string",\n            "getcMun": 9159,\n            "getxBairro": "string",\n            "UF": "string",\n            "CEP": "string"\n          },\n          "email": "string",\n          "indIEDest": "NAO_CONTRIBUINTE",\n          "CNPJ": "string",\n          "CPF": "string"\n        },\n        "transp": {\n          "modFrete": 1806,\n          "vol": [\n            {\n              "pesoL": 4884.472295216967,\n              "esp": "string",\n              "getqVol": 6741.41093513416,\n              "pesoB": 6041.030146095825\n            },\n            {\n              "pesoL": 3256.9960593921555,\n              "esp": "string",\n              "getqVol": 4000.1457588911426,\n              "pesoB": 9549.22081692881\n            }\n          ],\n          "transporta": {\n            "getxNome": "string"\n          }\n        }\n      }\n    }\n  },\n  "procEventoNFe": [\n    {\n      "evento": {\n        "infEvento": {\n          "cnpj": 7974,\n          "cOrgao": "string",\n          "tpAmb": 1180,\n          "CNPJ": 9049,\n          "chNFe": "string",\n          "dhEvento": "string",\n          "tpEvento": 869,\n          "nSeqEvento": "string",\n          "verEvento": 4413,\n          "detEvento": {\n            "descEvento": "string",\n            "nProt": "string",\n            "xJust": "string",\n            "_versao": "string"\n          },\n          "Id": "string"\n        }\n      },\n      "retEvento": {\n        "infEvento": {\n          "cpfdest": "string",\n          "verAplic": "string",\n          "cOrgao": "string",\n          "cStat": "string",\n          "xMotivo": "string",\n          "chNFe": "string",\n          "tpEvento": "string",\n          "xEvento": "string",\n          "nSeqEvento": "string",\n          "CPFDest": "string",\n          "dhRegEvento": "string",\n          "nProt": "string"\n        }\n      }\n    },\n    {\n      "evento": {\n        "infEvento": {\n          "cnpj": 4212,\n          "cOrgao": "string",\n          "tpAmb": 1641,\n          "CNPJ": 8722,\n          "chNFe": "string",\n          "dhEvento": "string",\n          "tpEvento": 5684,\n          "nSeqEvento": "string",\n          "verEvento": 9090,\n          "detEvento": {\n            "descEvento": "string",\n            "nProt": "string",\n            "xJust": "string",\n            "_versao": "string"\n          },\n          "Id": "string"\n        }\n      },\n      "retEvento": {\n        "infEvento": {\n          "cpfdest": "string",\n          "verAplic": "string",\n          "cOrgao": "string",\n          "cStat": "string",\n          "xMotivo": "string",\n          "chNFe": "string",\n          "tpEvento": "string",\n          "xEvento": "string",\n          "nSeqEvento": "string",\n          "CPFDest": "string",\n          "dhRegEvento": "string",\n          "nProt": "string"\n        }\n      }\n    }\n  ]\n}',
          },
          {
            statusCode: '202',
            description:
              'Requisição aceita, mas ainda não processada completamente',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/historico/{documento}',
        summary: 'consultar',
        description:
          'Realiza consulta ao histórico de requisições\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- HISTORICO',
        tags: ['Restritivos', 'historico'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'tipoPessoa',
            in: 'query',
            required: true,
            type: 'string',
            description: 'F - Pessoa Física / J - Pessoa Jurídica',
          },
          {
            name: 'tipoRestritivo',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Tipo de restritivo',
          },
          {
            name: 'tipoAcesso',
            in: 'query',
            required: true,
            type: 'string',
            description: 'E - Consulta Externa / I - Consulta Interna',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Código do sistema que realizou a requisição',
          },
          {
            name: 'descricaoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Nome do sistema, será usado %descricao%',
          },
          {
            name: 'dataInicial',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Data inicial das requisições, será usado >=',
          },
          {
            name: 'dataFinal',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Data final das requisições, será usado <=',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '[\n  {\n    "codigoRequisicao": 5516,\n    "dataHoraSolicitacao": "2018-11-25T19:35:32.785Z",\n    "codigoCliente": "string",\n    "tipoPessoa": "string",\n    "tipoRestritivo": "string",\n    "tipoAcesso": "string",\n    "codigoSistema": 1493,\n    "descricaoSistema": "string"\n  },\n  {\n    "codigoRequisicao": 970,\n    "dataHoraSolicitacao": "1958-01-12T05:48:13.197Z",\n    "codigoCliente": "string",\n    "tipoPessoa": "string",\n    "tipoRestritivo": "string",\n    "tipoAcesso": "string",\n    "codigoSistema": 7522,\n    "descricaoSistema": "string"\n  }\n]',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/infoconv/cpf/{cpf}',
        summary: 'buscar Dados Por Cpf',
        description: 'Pesquisa dados de pessoas físicas',
        tags: ['Restritivos', 'infoconv', 'cpf'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'cpf',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "cpf": "string",\n  "nome": "string",\n  "situacaoCadastral": "string",\n  "residenteExterior": "string",\n  "nomeMae": "string",\n  "dataNascimento": "1955-08-14",\n  "sexo": "string",\n  "anoObito": "string",\n  "dataAtualizacao": "1958-03-26",\n  "idConsulta": "string"\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/infoconv/cnpj/{cnpj}',
        summary: 'buscar Dados Por Cnpj',
        description: 'Pesquisa dados de pessoas jurídicas',
        tags: ['Restritivos', 'infoconv', 'cnpj'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'cnpj',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "cnpj": "string",\n  "estabelecimento": "string",\n  "nomeEmpresarial": "string",\n  "nomeFantasia": "string",\n  "situacaoCadastral": "string",\n  "dataSituacaoCadastral": "2018-02-04",\n  "cidadeExterior": "string",\n  "codigoPais": "string",\n  "nomePais": "string",\n  "naturezaJuridica": "string",\n  "dataAbertura": "1975-08-13",\n  "cnaePrincipal": "string",\n  "cnaeSecundario": [\n    "string",\n    "string"\n  ],\n  "tipoLogradouro": "string",\n  "logradouro": "string",\n  "numeroLogradouro": "string",\n  "complemento": "string",\n  "bairro": "string",\n  "cep": "string",\n  "uf": "string",\n  "codigoMunicipio": "string",\n  "nomeMunicipio": "string",\n  "ddd1": "string",\n  "telefone1": "string",\n  "ddd2": "string",\n  "telefone2": "string",\n  "email": "string",\n  "idConsulta": "string"\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/info-simples/simples-nacional/{cnpj}',
        summary: 'consulta Simples Nacional',
        description:
          'Consulta dados do Simples Nacional para pessoa jurídica\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- SIMPLES_NACIONAL',
        tags: ['Restritivos', 'info-simples', 'simples-nacional'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'cnpj',
            in: 'path',
            required: true,
            type: 'string',
            description: 'CNPJ da empresa com dados compartilhados na RFB.',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "dadosCadastro": {\n    "idPessoa": 402,\n    "nome": "string",\n    "idFiscal": "string"\n  },\n  "cnpj": "string",\n  "conseguiu_obter_mais_informacoes": true,\n  "consulta_datahora": "string",\n  "normalizado_cnpj": "string",\n  "origem": "string",\n  "razao_social": "string",\n  "simei_situacao": "string",\n  "simples_nacional_situacao": "string",\n  "site_receipt": "string"\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/info-simples/cnpj/{cnpj}',
        summary: 'consulta CNPJ Simples Nacional',
        description:
          'Consulta dados do CNPJ para pessoa jurídica\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- INFO_SIMPLES_CNPJ',
        tags: ['Restritivos', 'info-simples', 'cnpj'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'cnpj',
            in: 'path',
            required: true,
            type: 'string',
            description: 'CNPJ da empresa com dados compartilhados na RFB.',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "dadosCadastro": {\n    "idPessoa": 9864,\n    "nome": "string",\n    "idFiscal": "string"\n  },\n  "abertura_data": "string",\n  "atividade_economica": "string",\n  "atividade_economica_secundaria": {},\n  "atividade_economica_secundaria_lista": {},\n  "capital_social": "string",\n  "certidao_baixa": {\n    "cnpj": "string",\n    "data_baixa": "string",\n    "nome_empresarial": "string",\n    "logradouro": "string",\n    "numero": "string",\n    "complemento": "string",\n    "bairro_ou_distrito": "string",\n    "municipio": "string",\n    "uf": "string",\n    "telefone": "string",\n    "atividade_economica": "string",\n    "motivo_baixa": "string",\n    "unidade_cadastradora": "string"\n  },\n  "cnpj": "string",\n  "consulta_datahora": "string",\n  "efr": "string",\n  "email": "string",\n  "endereco_bairro": "string",\n  "endereco_cep": "string",\n  "endereco_complemento": "string",\n  "endereco_logradouro": "string",\n  "endereco_municipio": "string",\n  "endereco_numero": "string",\n  "endereco_uf": "string",\n  "licenciamento_dispensado": [\n    {\n      "atividade_economica": "string",\n      "orgao": "string",\n      "abrangencia": "string",\n      "condicoes": "string"\n    },\n    {\n      "atividade_economica": "string",\n      "orgao": "string",\n      "abrangencia": "string",\n      "condicoes": "string"\n    }\n  ],\n  "matriz_filial": "string",\n  "natureza_juridica": "string",\n  "natureza_juridica_codigo": "string",\n  "nome_fantasia": "string",\n  "normalizado_abertura_data": "string",\n  "normalizado_capital_social": "string",\n  "normalizado_cnpj": "string",\n  "normalizado_consulta_datahora": "string",\n  "normalizado_endereco_cep": "string",\n  "normalizado_situacao_cadastral_data": "string",\n  "normalizado_situacao_especial_data": "string",\n  "origem": "string",\n  "porte": "string",\n  "qsa": [\n    {\n      "nome": "string",\n      "qualificacao": "string",\n      "nome_representante_legal": "string",\n      "qualificacao_representante_legal": "string",\n      "pais_origem": "string"\n    },\n    {\n      "nome": "string",\n      "qualificacao": "string",\n      "nome_representante_legal": "string",\n      "qualificacao_representante_legal": "string",\n      "pais_origem": "string"\n    }\n  ],\n  "razao_social": "string",\n  "situacao_cadastral": "string",\n  "situacao_cadastral_data": "string",\n  "situacao_cadastral_observacoes": "string",\n  "situacao_especial": "string",\n  "situacao_especial_data": "string",\n  "telefone": "string",\n  "site_receipt": "string"\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/configuracao/scr',
        summary: 'obter Configuracao Scr',
        tags: ['Restritivos', 'configuracao', 'scr'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example: '{\n  "dataBase": "5647-46",\n  "id": 3941\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'PATCH',
        path: '/api/v1/configuracao/scr',
        summary: 'atualizar Configuracao Scr',
        description:
          'Protegido pelas seguintes transações do AmazonSegu\n- CONFIGURACOES',
        tags: ['Restritivos', 'configuracao', 'scr'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
        ],
        requestBody: '{\n  "dataBase": "9057-82"\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/ciob/{documento}',
        summary: 'consulta Ciob',
        description:
          'Realiza consultas no CIOB\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- CIOB',
        tags: ['Restritivos', 'ciob'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "codigo": 4696,\n  "situacaoCiob": "NAO_CONSULTADO",\n  "dataConsulta": "1980-04-02",\n  "idFiscal": "string",\n  "informacoesCiob": [\n    {\n      "statusCiob": "string",\n      "descricaoStatus": "string",\n      "nomeCliente": "string",\n      "indicativo": 4796,\n      "descricaoIndicativo": "string",\n      "dataInclusao": "1982-05-24",\n      "dataExclusao": "1969-08-18",\n      "contrato": "string",\n      "dataParcela": "1986-03-20"\n    },\n    {\n      "statusCiob": "string",\n      "descricaoStatus": "string",\n      "nomeCliente": "string",\n      "indicativo": 8794,\n      "descricaoIndicativo": "string",\n      "dataInclusao": "2014-04-08",\n      "dataExclusao": "1965-12-25",\n      "contrato": "string",\n      "dataParcela": "2019-09-05"\n    }\n  ],\n  "tipoPessoa": "string"\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/compartilha-rfb/renda-pf/cpf-titular-dados/{cpfTitularDados}',
        summary: 'consulta Renda Pf',
        description:
          'Realiza consulta de renda PF ao serviço de compartilhamento de Dados da RFB\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- COMPARTILHA_RFB_CONSULTA',
        tags: [
          'Restritivos',
          'compartilha-rfb',
          'renda-pf',
          'cpf-titular-dados',
        ],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'cpfTitularDados',
            in: 'path',
            required: true,
            type: 'string',
            description:
              'Cpf do titular da informação para consulta de dados compartilhados na RFB.',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "autorizacao": {\n    "token": "string",\n    "dataHoraRegistro": "string",\n    "titular": "string",\n    "destinatario": "string",\n    "avisoLegal": "string"\n  },\n  "servico": "string",\n  "idServico": "string",\n  "versao": "string",\n  "dados": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ]\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/compartilha-rfb/token/{token}',
        summary: 'consulta Compartilha Rfb Por Token',
        description:
          'Realiza consultas ao serviço de compartilhamento de Dados da RFB por token de autorizacao\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- COMPARTILHA_RFB_CONSULTA',
        tags: ['Restritivos', 'compartilha-rfb', 'token'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'token',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "codigo": 8822,\n  "autorizacao": {\n    "token": "string",\n    "dataHoraRegistro": "string",\n    "titular": "string",\n    "cnpjTitular": "string",\n    "anoCalendario": "string",\n    "destinatario": "string",\n    "avisoLegal": "string"\n  },\n  "idServico": "string",\n  "servico": "string",\n  "versao": "string",\n  "dadosSimplesNacionalPgdasd": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosSimplesNacionalDefis": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosMeiDasnSimei": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosMeiPgmei": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosCnpj": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosEcf": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosPronampe": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosCadastro": {\n    "idPessoa": 2036,\n    "nome": "string",\n    "idFiscal": "string"\n  },\n  "possuiErro": true,\n  "mensagem": "string"\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/compartilha-rfb/cpf-titular-dados/{cpfTitularDados}/cnpj-empresa/{cnpjEmpresa}',
        summary: 'consulta Compartilha Rfb',
        description:
          'Realiza consultas ao serviço de compartilhamento de Dados da RFB\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- COMPARTILHA_RFB_CONSULTA',
        tags: [
          'Restritivos',
          'compartilha-rfb',
          'cpf-titular-dados',
          'cnpj-empresa',
        ],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'cpfTitularDados',
            in: 'path',
            required: true,
            type: 'string',
            description:
              'Cpf do titular da informação para consulta de dados compartilhados na RFB.',
          },
          {
            name: 'cnpjEmpresa',
            in: 'path',
            required: true,
            type: 'string',
            description: 'CNPJ da empresa com dados compartilhados na RFB.',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "codigo": 8822,\n  "autorizacao": {\n    "token": "string",\n    "dataHoraRegistro": "string",\n    "titular": "string",\n    "cnpjTitular": "string",\n    "anoCalendario": "string",\n    "destinatario": "string",\n    "avisoLegal": "string"\n  },\n  "idServico": "string",\n  "servico": "string",\n  "versao": "string",\n  "dadosSimplesNacionalPgdasd": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosSimplesNacionalDefis": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosMeiDasnSimei": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosMeiPgmei": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosCnpj": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosEcf": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosPronampe": [\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    },\n    {\n      "codigo": "string",\n      "texto": "string",\n      "valor": "string"\n    }\n  ],\n  "dadosCadastro": {\n    "idPessoa": 2036,\n    "nome": "string",\n    "idFiscal": "string"\n  },\n  "possuiErro": true,\n  "mensagem": "string"\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/v1/compartilha-rfb/reset-cache/cnpj-empresa/{cnpjEmpresa}',
        summary: 'reset Cache Compartilhamento Dados RFB',
        description:
          'Forca a proxima consulta por CNPJ a desconsiderar cache e consultar servico externo\n# ------------------ #\nProtegido pelas seguintes transações do AmazonSegu\n- COMPARTILHA_RFB_CONSULTA',
        tags: ['Restritivos', 'compartilha-rfb', 'reset-cache', 'cnpj-empresa'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'cnpjEmpresa',
            in: 'path',
            required: true,
            type: 'string',
            description: 'CNPJ da empresa com dados compartilhados na RFB.',
          },
        ],
        responses: [
          {
            statusCode: '201',
            description: 'OK',
          },
          {
            statusCode: '202',
            description:
              'Requisição aceita, mas ainda não processada completamente',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/v1/biometria',
        summary: 'validar Biometria',
        description: 'Realiza consulta no serviço do Cadin',
        tags: ['Restritivos', 'biometria'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
        ],
        requestBody:
          '{\n  "key": {\n    "cpf": "string"\n  },\n  "answer": {\n    "biometria_face": "string"\n  }\n}',
        responses: [
          {
            statusCode: '201',
            description: 'OK',
            example:
              '{\n  "cpf_disponivel": true,\n  "cnh_disponivel": true,\n  "biometria_face": {\n    "disponivel": true,\n    "probabilidade": "string",\n    "similaridade": 3806.057966188635\n  }\n}',
          },
          {
            statusCode: '202',
            description:
              'Requisição aceita, mas ainda não processada completamente',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/restritivos/{documento}',
        summary: 'consulta Restritivos',
        description:
          'Protegido pelas seguintes transações do AmazonSegu\n- CADIN\n- CIOB\n- SERASA\n- SCR',
        tags: ['Restritivos', 'restritivos'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
          {
            name: 'documento',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Cpf ou Cnpj para consulta',
          },
          {
            name: 'codigoSistema',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Código referente aos parâmetros de consulta para um determinado sistema, como data de validade de consultas',
          },
          {
            name: 'consultaCadin',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'consultaCiob',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'consultaSerasa',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'consultaScr',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "situacaoRestritivos": false,\n  "detalheRestritivosConjugados": {\n    "cadinResponse": {\n      "codigoSolicitacao": 4220,\n      "situacaoCadin": "NAO",\n      "informacoesCadin": [\n        {\n          "codigo": "string",\n          "nome": "string",\n          "dataHora": "1958-08-21T01:37:21.465Z"\n        },\n        {\n          "codigo": "string",\n          "nome": "string",\n          "dataHora": "1994-12-09T23:36:53.481Z"\n        }\n      ]\n    },\n    "ciobResponse": {\n      "codigo": 2487,\n      "situacaoCiob": "NAO",\n      "dataConsulta": "1949-03-10",\n      "idFiscal": "string",\n      "informacoesCiob": [\n        {\n          "statusCiob": "string",\n          "descricaoStatus": "string",\n          "nomeCliente": "string",\n          "indicativo": 3460,\n          "descricaoIndicativo": "string",\n          "dataInclusao": "1949-04-09",\n          "dataExclusao": "1995-08-21",\n          "contrato": "string",\n          "dataParcela": "1988-10-31"\n        },\n        {\n          "statusCiob": "string",\n          "descricaoStatus": "string",\n          "nomeCliente": "string",\n          "indicativo": 6177,\n          "descricaoIndicativo": "string",\n          "dataInclusao": "2025-12-22",\n          "dataExclusao": "1987-03-30",\n          "contrato": "string",\n          "dataParcela": "2017-06-15"\n        }\n      ],\n      "tipoPessoa": "string"\n    },\n    "serasaResponse": {\n      "codigoSolicitacao": 6928,\n      "situacaoSerasa": "NAO_CONSULTADO",\n      "scoring": {\n        "codigoRetorno": "string",\n        "codigoScoring": "string",\n        "dataReferencia": "2005-01-28",\n        "mensagemScoring": "string",\n        "pontuacao": "string",\n        "tipoRegistro": "string"\n      },\n      "confirmacaoTelefone": {\n        "bairro": "string",\n        "cep": "string",\n        "cidade": "string",\n        "classeAssinante": "string",\n        "codigoRetorno": "string",\n        "dddTelefone": "string",\n        "documentoConfere": "string",\n        "logradouro": "string",\n        "mensagem": "string",\n        "nomeAssinante": "string",\n        "numeroTelefone": "string",\n        "tipoAssinente": "string",\n        "tipoRegistro": "string"\n      },\n      "confirmei": {\n        "dataConfirmei": "1963-09-14",\n        "dataSituacao": "2001-07-11",\n        "municipio": "string",\n        "nome": "string",\n        "nomeMaeFantasia": "string",\n        "situacao": "SUSPENSA",\n        "tipoRegistro": "string",\n        "uf": "string"\n      },\n      "consultasPorBanco": {\n        "detalhes": [\n          {\n            "mes": "4087-72",\n            "quantidadeConsultas": 6567\n          },\n          {\n            "mes": "4561-14",\n            "quantidadeConsultas": 2954\n          }\n        ],\n        "tipoRegistro": "string"\n      },\n      "consultasPorEmpresa": {\n        "detalhes": [\n          {\n            "mes": "6790-47",\n            "quantidadeConsultas": 8165\n          },\n          {\n            "mes": "5270-22",\n            "quantidadeConsultas": 750\n          }\n        ],\n        "tipoRegistro": "string"\n      },\n      "mensagemAlerta": {\n        "mensagemAlerta": "string",\n        "sequencialRegistro": "string",\n        "tipoRegistro": "string"\n      },\n      "resumoAchei": {\n        "detalhes": [\n          {\n            "cidade": "string",\n            "codigoAgencia": "string",\n            "codigoBanco": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1973-11-01",\n            "descricaoNatureza": "string",\n            "nomeBanco": "string",\n            "numeroCheque": "string",\n            "numeroContaCorrente": "string",\n            "praca": "string",\n            "tipoRegistro": "string",\n            "titularContaConjunta": "string",\n            "uf": "string",\n            "valorCheque": 5570.01719304021\n          },\n          {\n            "cidade": "string",\n            "codigoAgencia": "string",\n            "codigoBanco": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1986-02-13",\n            "descricaoNatureza": "string",\n            "nomeBanco": "string",\n            "numeroCheque": "string",\n            "numeroContaCorrente": "string",\n            "praca": "string",\n            "tipoRegistro": "string",\n            "titularContaConjunta": "string",\n            "uf": "string",\n            "valorCheque": 9299.661443304707\n          }\n        ],\n        "dataInicial": "2017-08-20",\n        "dataFinal": "1970-01-18",\n        "quantidadeOcorrencia": 6556,\n        "tipoRegistro": "string"\n      },\n      "resumoAcoes": {\n        "detalhes": [\n          {\n            "cidade": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "2012-09-26",\n            "descricaoNatureza": "string",\n            "numeroDistribuidor": "string",\n            "numeroVaraCivil": "string",\n            "praca": "string",\n            "principal": "string",\n            "subJudice": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "valorAcao": 1338.5546227238442\n          },\n          {\n            "cidade": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1958-05-14",\n            "descricaoNatureza": "string",\n            "numeroDistribuidor": "string",\n            "numeroVaraCivil": "string",\n            "praca": "string",\n            "principal": "string",\n            "subJudice": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "valorAcao": 1567.1754479369738\n          }\n        ],\n        "dataInicial": "2008-10-18",\n        "dataFinal": "1976-02-05",\n        "quantidadeOcorrencia": 3148,\n        "tipoRegistro": "string"\n      },\n      "resumoCCF": {\n        "detalhes": [\n          {\n            "cidade": "string",\n            "codigoAgencia": "string",\n            "codigoBanco": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "2004-04-30",\n            "descricaoNatureza": "string",\n            "nomeBanco": "string",\n            "praca": "string",\n            "quantidadeCheques": 250,\n            "tipoRegistro": "string",\n            "uf": "string"\n          },\n          {\n            "cidade": "string",\n            "codigoAgencia": "string",\n            "codigoBanco": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1994-11-08",\n            "descricaoNatureza": "string",\n            "nomeBanco": "string",\n            "praca": "string",\n            "quantidadeCheques": 8932,\n            "tipoRegistro": "string",\n            "uf": "string"\n          }\n        ],\n        "dataInicial": "2000-02-28",\n        "dataFinal": "2007-09-06",\n        "quantidadeOcorrencia": 5727,\n        "tipoRegistro": "string"\n      },\n      "resumoConvemDevedores": {\n        "detalhes": [\n          {\n            "cnpjCredor": "string",\n            "codigoNatureza": "string",\n            "contrato": "string",\n            "dataOcorrencia": "2000-04-13",\n            "descricaoNatureza": "string",\n            "nomeInstituicao": "string",\n            "praca": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "valorOcorrencia": 1822.6964396033318\n          },\n          {\n            "cnpjCredor": "string",\n            "codigoNatureza": "string",\n            "contrato": "string",\n            "dataOcorrencia": "1953-04-26",\n            "descricaoNatureza": "string",\n            "nomeInstituicao": "string",\n            "praca": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "valorOcorrencia": 3345.2584621265346\n          }\n        ],\n        "dataInicial": "1993-09-18",\n        "dataFinal": "1994-01-30",\n        "quantidadeOcorrencia": 8249,\n        "tipoRegistro": "string"\n      },\n      "resumoFalenciaConcordata": {\n        "detalhes": [\n          {\n            "cidade": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1952-01-26",\n            "descricaoNatureza": "string",\n            "praca": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "numeroVaraCivil": "string"\n          },\n          {\n            "cidade": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1981-09-28",\n            "descricaoNatureza": "string",\n            "praca": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "numeroVaraCivil": "string"\n          }\n        ],\n        "dataInicial": "1948-10-12",\n        "dataFinal": "1994-04-20",\n        "quantidadeOcorrencia": 9293,\n        "tipoRegistro": "string"\n      },\n      "resumoParticipanteEmpresaFalida": {\n        "detalhes": [\n          {\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1981-10-18",\n            "descricaoNatureza": "string",\n            "tipoRegistro": "string",\n            "descricaoQualificacao": "string",\n            "codigoQualificacao": "string",\n            "nomeEmpresa": "string",\n            "numeroVaraCivil": "string",\n            "cnpjEmpresa": "string"\n          },\n          {\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1997-08-06",\n            "descricaoNatureza": "string",\n            "tipoRegistro": "string",\n            "descricaoQualificacao": "string",\n            "codigoQualificacao": "string",\n            "nomeEmpresa": "string",\n            "numeroVaraCivil": "string",\n            "cnpjEmpresa": "string"\n          }\n        ],\n        "dataInicial": "2009-09-29",\n        "dataFinal": "1971-05-13",\n        "quantidadeOcorrencia": 7354,\n        "tipoRegistro": "string"\n      },\n      "resumoPefin": {\n        "detalhes": [\n          {\n            "cnpjCredor": "string",\n            "contrato": "string",\n            "nomeCredor": "string",\n            "nomeInstituicao": "string",\n            "principal": "string",\n            "subJudice": "string",\n            "valorOcorrencia": 1205.0018870906454,\n            "codigoNatureza": "string",\n            "dataOcorrencia": "2025-02-26",\n            "descricaoNatureza": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "praca": "string"\n          },\n          {\n            "cnpjCredor": "string",\n            "contrato": "string",\n            "nomeCredor": "string",\n            "nomeInstituicao": "string",\n            "principal": "string",\n            "subJudice": "string",\n            "valorOcorrencia": 3981.523028042413,\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1972-03-01",\n            "descricaoNatureza": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "praca": "string"\n          }\n        ],\n        "dataInicial": "2007-11-13",\n        "dataFinal": "2017-05-22",\n        "quantidadeOcorrencia": 4634,\n        "tipoRegistro": "string"\n      },\n      "resumoProtestos": {\n        "detalhes": [\n          {\n            "cidade": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1962-07-29",\n            "descricaoNatureza": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "praca": "string",\n            "dataCarta": "1983-12-17",\n            "numeroCartorio": "string",\n            "subJudice": "string",\n            "valorProtesto": 227.0079048126461\n          },\n          {\n            "cidade": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1994-01-23",\n            "descricaoNatureza": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "praca": "string",\n            "dataCarta": "1982-11-08",\n            "numeroCartorio": "string",\n            "subJudice": "string",\n            "valorProtesto": 8319.69634320036\n          }\n        ],\n        "dataInicial": "1975-08-31",\n        "dataFinal": "1984-05-19",\n        "quantidadeOcorrencia": 195,\n        "tipoRegistro": "string"\n      },\n      "resumoRefin": {\n        "detalhes": [\n          {\n            "cnpjCredor": "string",\n            "codigoEmpresa": "string",\n            "nomeEmpresa": "string",\n            "participante": "string",\n            "principal": "string",\n            "subJudice": "string",\n            "valorOcorrencia": 980.9191703273667,\n            "codigoAgencia": "string",\n            "cidade": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "2025-03-13",\n            "descricaoNatureza": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "praca": "string"\n          },\n          {\n            "cnpjCredor": "string",\n            "codigoEmpresa": "string",\n            "nomeEmpresa": "string",\n            "participante": "string",\n            "principal": "string",\n            "subJudice": "string",\n            "valorOcorrencia": 1119.0517245113263,\n            "codigoAgencia": "string",\n            "cidade": "string",\n            "codigoNatureza": "string",\n            "dataOcorrencia": "1948-11-20",\n            "descricaoNatureza": "string",\n            "tipoRegistro": "string",\n            "uf": "string",\n            "praca": "string"\n          }\n        ],\n        "dataInicial": "1951-12-23",\n        "dataFinal": "1948-12-05",\n        "quantidadeOcorrencia": 9283,\n        "tipoRegistro": "string"\n      },\n      "status": "string",\n      "registrosConsultas": [\n        {\n          "dataConsulta": "2007-09-02",\n          "nomeCliente": "string",\n          "tipoRegistro": "string"\n        },\n        {\n          "dataConsulta": "1992-08-06",\n          "nomeCliente": "string",\n          "tipoRegistro": "string"\n        }\n      ],\n      "registrosGrafia": [\n        {\n          "nome": "string",\n          "tipoRegistro": "string"\n        }\n      ],\n      "atenuado": false,\n      "atenuacao": {\n        "dataHoraCalculo": "1986-07-25T08:47:25.432Z",\n        "idPessoa": 5503,\n        "documento": "string",\n        "tipoPessoa": "PJ",\n        "nivelRisco": "string",\n        "totalRendas": 5703.132373757807,\n        "totalFaturamento": 5332.270023370758,\n        "totalFinanceiro": 6183.3206230353935,\n        "totalRendasComuns": 2466.601666920151,\n        "valorRbire": 9780.10214156047,\n        "valorRmpr": 6466.904272830118,\n        "quantidadeOcupacoes": 4426,\n        "quantidadeRendas": 8054,\n        "quantidadeFaturamentos": 7319,\n        "restritivos": [\n          {\n            "tipoRestritivo": "string",\n            "categoriaRestritivo": "string",\n            "valorRestritivo": 8255.339343901796,\n            "percentualRestritivo": 9297.773806432993,\n            "atenuado": false,\n            "mensagem": "string",\n            "criterioAtenuacao": "string",\n            "totalRestritivo": 5794.113102187172\n          },\n          {\n            "tipoRestritivo": "string",\n            "categoriaRestritivo": "string",\n            "valorRestritivo": 7657.495150671306,\n            "percentualRestritivo": 1969.4131156673611,\n            "atenuado": false,\n            "mensagem": "string",\n            "criterioAtenuacao": "string",\n            "totalRestritivo": 2618.217603734215\n          }\n        ],\n        "atenuado": true\n      }\n    },\n    "scrResponse": {\n      "dataBase": "1430-60",\n      "situacaoScr": "NAO_CONSULTADO",\n      "possuiDadosClienteScr": false,\n      "possuiResumoEndividamentoScr": false,\n      "resumoDadosCliente": {\n        "percentualDocumentosProcessados": 7500.7812356324375,\n        "percentualVolumeProcessado": 3221.208746990588,\n        "quantidadeInstituicoes": 5894,\n        "quantidadeOperacoes": 6345,\n        "quantidadeOperacoesSubJudice": 2410,\n        "responsabilidadeTotalSubJudice": 5785.3731992551\n      },\n      "resumoEndividamento": {\n        "valorAVencer": 9999.159312910875,\n        "valorCarteiraCredito": 8252.654082466841,\n        "valorCarteiraCreditoAte360Dias": 5179.026738756151,\n        "valorCoobrigacoes": 9561.733314533982,\n        "valorCreditoALiberar": 7811.541699423248,\n        "valorPrejuizo": 8646.620445672941,\n        "valorRepassesInterfinanceiros": 6617.492474871212,\n        "valorRepassesInterfinanceirosAte360Dias": 7661.602034996176,\n        "valorResponsabilidadeTotal": 8253.749536743617,\n        "valorRiscoTotal": 5973.621169223571,\n        "valorVencido": 9942.258043038273,\n        "valorCoobrigacoesAte360Dias": 9636.091881495124,\n        "valorAVencerAte360Dias": 7719.985355970847,\n        "valorVencidoAte360Dias": 791.0997727736335,\n        "valorAVencerDe361Ate720Dias": 2672.83380637928,\n        "valorAVencerDe721Ate1080Dias": 573.7115674550797,\n        "valorAVencerDe1081Ate1440Dias": 4867.65997952039,\n        "valorAVencerDe1441Ate1800Dias": 7578.939074388052,\n        "valorAVencerDe1801Ate5400Dias": 3207.4172635417576,\n        "valorAVencerAcimaDe5400Dias": 9679.683324524283,\n        "valorResponsabilidadeTotalAte360Dias": 8531.634489151837,\n        "valorVencidoAcimaDe360Dias": 1875.6317854087922,\n        "valorAVencerAcimaDe360Dias": 1212.3518882711926\n      },\n      "responsabilidadeCliente": {\n        "curtoPrazo": {\n          "vincendo": 303.39968424989206,\n          "vencido": 4694.129113580221,\n          "prejuizado": 9965.018026200576\n        },\n        "longoPrazo": {\n          "vincendo": 8804.762266178608,\n          "vencido": 8140.300384947891,\n          "prejuizado": 6904.041648448088\n        },\n        "coobrigacoes": {\n          "vincendo": 8115.302517551561,\n          "vencido": 5335.766702363546,\n          "prejuizado": 6064.523686329607\n        }\n      },\n      "operacoes": [\n        {\n          "codigoModalidade": "string",\n          "descricaoDominio": "string",\n          "descricaoSubDominio": "string",\n          "variacaoCambial": "string",\n          "vencimentos": [\n            {\n              "codigoVencimento": "string",\n              "descricaoVencimento": "string",\n              "valorVencimento": 121.79725166179045\n            },\n            {\n              "codigoVencimento": "string",\n              "descricaoVencimento": "string",\n              "valorVencimento": 9021.937249342214\n            }\n          ]\n        },\n        {\n          "codigoModalidade": "string",\n          "descricaoDominio": "string",\n          "descricaoSubDominio": "string",\n          "variacaoCambial": "string",\n          "vencimentos": [\n            {\n              "codigoVencimento": "string",\n              "descricaoVencimento": "string",\n              "valorVencimento": 3766.921894846975\n            },\n            {\n              "codigoVencimento": "string",\n              "descricaoVencimento": "string",\n              "valorVencimento": 6288.270554634675\n            }\n          ]\n        }\n      ],\n      "resumoEndividamentosInterno": [\n        {\n          "codigoModalidade": "string",\n          "codigoVencimento": "string",\n          "valorVencimento": 9125.921461764437\n        },\n        {\n          "codigoModalidade": "string",\n          "codigoVencimento": "string",\n          "valorVencimento": 4562.012836964989\n        }\n      ],\n      "atenuado": true,\n      "atenuacao": {\n        "dataHoraCalculo": "1958-02-02T07:27:58.370Z",\n        "idPessoa": 242,\n        "documento": "string",\n        "tipoPessoa": "PJ",\n        "nivelRisco": "string",\n        "totalRendas": 8443.136191262685,\n        "totalFaturamento": 8937.595071486045,\n        "totalFinanceiro": 5117.150620281595,\n        "totalRendasComuns": 9133.806043394781,\n        "valorRbire": 9887.749340062763,\n        "valorRmpr": 8849.560954651175,\n        "quantidadeOcupacoes": 8023,\n        "quantidadeRendas": 5908,\n        "quantidadeFaturamentos": 2119,\n        "restritivos": [\n          {\n            "tipoRestritivo": "string",\n            "categoriaRestritivo": "string",\n            "valorRestritivo": 4724.013150003343,\n            "percentualRestritivo": 5785.225785369994,\n            "atenuado": true,\n            "mensagem": "string",\n            "criterioAtenuacao": "string",\n            "totalRestritivo": 8601.2866817817\n          },\n          {\n            "tipoRestritivo": "string",\n            "categoriaRestritivo": "string",\n            "valorRestritivo": 3815.323463111022,\n            "percentualRestritivo": 2521.893345914518,\n            "atenuado": false,\n            "mensagem": "string",\n            "criterioAtenuacao": "string",\n            "totalRestritivo": 7687.295049545999\n          }\n        ],\n        "atenuado": false\n      }\n    }\n  },\n  "resultadoRestritivosConjugados": {\n    "cadin": true,\n    "ciob": false,\n    "serasa": true,\n    "scr": true\n  }\n}',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/v1/restritivos/cache/reset',
        summary: 'resetar Cache Restritivos',
        description:
          'Protegido pelas seguintes transações do AmazonSegu\n- CADIN\n- SERASA\n- SCR',
        tags: ['Restritivos', 'restritivos', 'cache', 'reset'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: '*/*',
          },
        ],
        requestBody:
          '{\n  "documento": "string",\n  "SERASA": true,\n  "CADIN": false,\n  "SCR": true\n}',
        responses: [
          {
            statusCode: '201',
            description: 'OK',
            example:
              '{\n  "SERASA": false,\n  "CADIN": false,\n  "SCR": false\n}',
          },
          {
            statusCode: '202',
            description:
              'Requisição aceita, mas ainda não processada completamente',
          },
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "details": [\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    },\n    {\n      "path": "string",\n      "message": "string",\n      "invalidValue": {}\n    }\n  ]\n}',
          },
          {
            statusCode: '401',
            description: 'Unauthorized',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '403',
            description: 'Forbidden',
            example:
              '{\n  "error": "string",\n  "error_description": "string"\n}',
          },
          {
            statusCode: '500',
            description: 'Internal Server Error',
            example:
              '{\n  "timestamp": "1989-02-05T09:56:15.961Z",\n  "path": "string",\n  "details": [\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    },\n    {\n      "code": "string",\n      "message": "string",\n      "content": {}\n    }\n  ],\n  "trace": "string"\n}',
          },
        ],
      },
    ],
  },
  {
    title: 'Valid',
    baseUrl: 'https://api.valid.com',
    partner: 'Valid',
    description:
      'Endpoints da Valid responsáveis pela consulta de resultados de OCR e pela obtenção das imagens dos documentos enviados para validação.',
    endpoints: [
      {
        method: 'GET',
        path: '/docs-gateway/api/v1/documents/{{document_id}}',
        summary: 'Get OCR',
        tags: ['Valid'],
        parameters: [
          {
            name: 'x-api-key',
            in: 'header',
            required: true,
            type: 'string',
            description: '<your-api-key>',
          },
        ],
      },
      {
        method: 'GET',
        path: '/docs-gateway/api/v1/documents/{{DOCUMENT_ID}}/files',
        summary: 'Get Document Image',
        tags: ['Valid'],
        parameters: [
          {
            name: 'x-api-key',
            in: 'header',
            required: true,
            type: 'string',
          },
        ],
      },
    ],
  },
  {
    title: 'Neobiz',
    baseUrl: 'https://api.lecom.com.br',
    partner: 'Neobiz',
    description:
      'Endpoints de integração com a plataforma Neobiz/Lecom (ECM), responsáveis pela inclusão e download de documentos, além da solicitação e retorno de processamento de OCR sobre documentos armazenados.',
    endpoints: [
      {
        method: 'POST',
        path: '/service/ecmcore/api/v1/templates/{{template_number}}/documents',
        summary: 'Incluir documento',
        tags: ['Neobiz'],
        parameters: [
          {
            name: 'apikey',
            in: 'header',
            required: true,
            type: 'string',
          },
          {
            name: 'X-Server',
            in: 'header',
            required: true,
            type: 'string',
          },
        ],
        requestBody:
          'multipart/form-data:\nfile (file): <arquivo: /C:/Users/danil/OneDrive/Área de Trabalho/nova-identidade.webp>\nduplicatesValues (text): false\ndocumentData[0].field (text): NUM_DOCUMENTO\ndocumentData[0].value (text): 123.321.654-89\ndocumentData[1].field (text): TIPO_CONTA\ndocumentData[1].value (text): PF\ndocumentData[2].field (text): DOC_TIPO\ndocumentData[2].value (text): CPF\ndocumentData[3].field (text): DOC_DATA_VALID\ndocumentData[3].value (text): 2026-01-25\ndocumentData[4].field (text): DOC_CLASSIFICACAO\ndocumentData[4].value (text): 123',
      },
      {
        method: 'POST',
        path: 'https://plataforma.neobiz.com.br/bpm/app/public/solicitaOCRDocumentosECM',
        summary: 'Solicitar OCR',
        tags: ['Neobiz'],
        parameters: [
          {
            name: 'apikey',
            in: 'header',
            required: true,
            type: 'string',
          },
        ],
        requestBody:
          '{\n \n "documentos": [\n { "fileUniqueId": "283699b6-b3b2-4135-bbc7-6918b01fbc52", "tipoDoc": "Documento de Identificação (CNH,Identidade)" }/* ,\n { "fileUniqueId": "87a99203-8ba6-42b0-8bc6-3a274434446e", "tipoDoc": "Comprovante de Renda" } */\n     ]\n}',
      },
      {
        method: 'POST',
        path: 'https://plataforma.neobiz.com.br/bpm/app/public/retornaOCRDocumentosECM',
        summary: 'Retornar OCR',
        tags: ['Neobiz'],
        parameters: [
          {
            name: 'apikey',
            in: 'header',
            required: true,
            type: 'string',
          },
        ],
        requestBody:
          '{\n "documentos": [\n     { "fileUniqueId": "ea4c65d8-51bc-45b6-9155-36db91d16b87" }/* ,\n    { "fileUniqueId": "87a99203-8ba6-42b0-8bc6-3a274434446e" } */\n ]\n}',
      },
      {
        method: 'GET',
        path: '/service/ecmcore/api/v1/documents/{{documentId}}/files/{{fileUniqueId}}',
        summary: 'Download de documento',
        tags: ['Neobiz'],
        parameters: [
          {
            name: 'apikey',
            in: 'header',
            required: true,
            type: 'string',
          },
          {
            name: 'X-Server',
            in: 'header',
            required: true,
            type: 'string',
          },
        ],
      },
    ],
  },
];
