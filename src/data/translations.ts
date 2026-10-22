export type Language = 'en' | 'es' | 'pt';

export interface Translations {
  // Header
  subBrand: string;
  appTitle: string;
  appSubtitle: string;
  discordBtn: string;
  guideBtn: string;

  // Presets
  presetsTitle: string;
  presetAttack: string;
  presetAttackDesc: string;
  presetGarrison: string;
  presetGarrisonDesc: string;
  presetBearTrap: string;
  presetBearTrapDesc: string;
  presetCustom: string;
  presetCustomDesc: string;
  customRatioTitle: string;
  customRatioTotal: string;
  customRatioNote: string;

  // Troops & Matrix
  troopRosterTitle: string;
  troopRosterSubtitle: string;
  troopMatrixTitle: string;
  viewBaseStats: string;
  hideBaseStats: string;
  tier: string;
  infantry: string;
  cavalry: string;
  archers: string;
  archersDps: string;
  subtotal: string;
  totalPool: string;
  rosterRatio: string;
  none: string;

  // Marches Settings
  marchCountTitle: string;
  marchCountDescLead: string;
  marchCountDescJoiner: string;
  leadRallyToggle: string;
  rallyLeadActive: string;
  allJoiners: string;
  rallyCapacityLabel: string;
  customRallyRatioToggle: string;
  joinerCapacityLabel: string;
  joinerCapacityNote: string;

  // Advisor
  strategyAdvisorTitle: string;
  advisorLowPool: string;
  advisorWarning: string;
  optimizeRallyBtn: string;
  oneTroopRallyBtn: string;

  // Dashboard
  outputDashboardTitle: string;
  squadsCount: string;
  balancedWavesDescLead: string;
  balancedWavesDescJoiner: string;
  copyAllMarches: string;
  copiedAllMarches: string;
  deployed: string;
  unassigned: string;
  fullyDeployed: string;
  barracksReserve: string;
  viewReserves: string;
  hideReserves: string;
  marchDeployments: string;

  // March Card
  marchTitleLead: string;
  marchTitleJoiner: string;
  troops: string;
  cap: string;
  rallyLeadBadge: string;
  copyMarch: string;
  copied: string;
  copiedMarchToast: string;

  // Guide Modal
  guideTitle: string;
  guideSubtitle: string;
  baseStatsTitle: string;
  tierNameHeader: string;
  archerRatioHeader: string;
  baseStatsNote: string;
  allocationRulesTitle: string;
  rule1Title: string;
  rule1Desc: string;
  rule2Title: string;
  rule2Desc: string;
  rule3Title: string;
  rule3Desc: string;
  closeGuide: string;

  // Footer & Toasts
  footerTagline: string;
  footerSpecs: string;
  presetAppliedToast: string;
  oneTroopToast: string;
  optimizedToast: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    subBrand: 'TEA Alliance · Tactical Tool',
    appTitle: 'TEA Kingshot Troop Calculator',
    appSubtitle: 'Multi-Tier (T9 to T10-TG3) Bear Trap optimizer. Equalizes troop counts across all joiner marches.',
    discordBtn: 'Join Discord',
    guideBtn: 'Formulas & Mechanics',

    presetsTitle: 'Preset Formations (Inf / Cav / Arch)',
    presetAttack: 'Attack',
    presetAttackDesc: 'Balanced offensive formation with heavy infantry frontline.',
    presetGarrison: 'Garrison',
    presetGarrisonDesc: 'High infantry wall with balanced flanks.',
    presetBearTrap: 'Bear Trap',
    presetBearTrapDesc: 'Maximum archer output for bear trap events.',
    presetCustom: 'Custom',
    presetCustomDesc: 'Define your own percentage ratio.',
    customRatioTitle: 'Custom Ratio Setup',
    customRatioTotal: 'Total',
    customRatioNote: 'ℹ Custom ratios are normalized dynamically if not totaling 100%.',

    troopRosterTitle: 'Troop Roster (T9 to T10-TG3)',
    troopRosterSubtitle: 'Enter available troops. Tiers are automatically prioritized from T10-TG3 down to T9.',
    troopMatrixTitle: 'Troop Breakdown Matrix',
    viewBaseStats: 'View Base Stats',
    hideBaseStats: 'Hide Base Stats',
    tier: 'Tier',
    infantry: 'Infantry',
    cavalry: 'Cavalry',
    archers: 'Archers',
    archersDps: 'Archers (DPS)',
    subtotal: 'Subtotal',
    totalPool: 'Total Pool',
    rosterRatio: 'Roster Ratio:',
    none: 'None',

    marchCountTitle: 'Total Number of Marches (1 to 7)',
    marchCountDescLead: '1 Rally Lead + {n} Joiner Marches',
    marchCountDescJoiner: '{n} Joiner Marches',
    leadRallyToggle: 'Lead a Rally (March 1)',
    rallyLeadActive: 'Rally Lead Active',
    allJoiners: 'All Joiners',
    rallyCapacityLabel: 'Rally Lead Capacity',
    customRallyRatioToggle: 'Custom Rally Ratio',
    joinerCapacityLabel: 'Joiner Max Capacity',
    joinerCapacityNote: 'Each joiner march is capped at this ceiling.',

    strategyAdvisorTitle: 'Strategy Advisor',
    advisorLowPool: 'Pool < 450K',
    advisorWarning: 'Warning: Your troop pool is too low to fill a full Rally Lead AND maintain balanced waves. Reduce rally size for optimal wave damage.',
    optimizeRallyBtn: 'Optimize Rally Lead ({cap})',
    oneTroopRallyBtn: 'Use 1-Troop Rally',

    outputDashboardTitle: 'Output Dashboard',
    squadsCount: '{n} Squads · Balanced Wave Distribution',
    balancedWavesDescLead: 'March 1 Lead + {n} Joiner Waves (Archers spread equally across joiners)',
    balancedWavesDescJoiner: 'All {n} Joiner Waves balanced with equal Archer DPS distribution',
    copyAllMarches: 'Copy All Marches',
    copiedAllMarches: 'Copied All Marches',
    deployed: 'Deployed',
    unassigned: 'Unassigned',
    fullyDeployed: 'Fully Deployed',
    barracksReserve: '{n} troops unassigned (Barracks reserve)',
    viewReserves: 'View Reserves',
    hideReserves: 'Hide',
    marchDeployments: 'March Deployments ({n} Marches)',

    marchTitleLead: 'March 1 (Rally Lead)',
    marchTitleJoiner: 'March {n} (Joiner)',
    troops: 'troops',
    cap: 'Cap',
    rallyLeadBadge: 'Rally Lead',
    copyMarch: 'Copy',
    copied: 'Copied',
    copiedMarchToast: 'Copied {title}',

    guideTitle: 'Formulas & Bear Trap Combat Guide',
    guideSubtitle: 'True Gold base stats, damage multipliers, and wave distribution logic.',
    baseStatsTitle: 'Base Attack Stats (T9 to T10-TG3)',
    tierNameHeader: 'Tier',
    archerRatioHeader: 'Archer Ratio',
    baseStatsNote: 'Archers deliver ~4.0x higher base attack than Infantry and ~1.33x higher than Cavalry against the Bear Trap.',
    allocationRulesTitle: 'Balanced Wave Distribution',
    rule1Title: 'Tier Priority:',
    rule1Desc: 'Highest tier troops are drawn first (T10-TG3 down to T9) for maximum combat score.',
    rule2Title: 'Equalized Spreading:',
    rule2Desc: 'Troops and archers are spread equally across all joiner marches (up to 6 joiners) so no march is left underfilled.',
    rule3Title: 'Autofill:',
    rule3Desc: 'If archers run out, remaining capacity is filled with Cavalry and Infantry to ensure full march deployment.',
    closeGuide: 'Close Guide',

    footerTagline: 'Kingshot Troop Split Tool',
    footerSpecs: 'T9 to T10-TG3 · Mobile Optimized',
    presetAppliedToast: 'Applied preset: {name}',
    oneTroopToast: 'Applied 1-Troop Rally Strategy',
    optimizedToast: 'Rally Lead set to {cap}',
  },

  es: {
    subBrand: 'Alianza TEA · Herramienta Táctica',
    appTitle: 'Calculadora de Tropas TEA Kingshot',
    appSubtitle: 'Optimizador de Trampa del Oso (T9 a T10-TG3). Equilibra tropas entre todas las marchas seguidoras.',
    discordBtn: 'Unirse al Discord',
    guideBtn: 'Fórmulas y Mecánicas',

    presetsTitle: 'Formaciones Predefinidas (Inf / Cab / Arq)',
    presetAttack: 'Ataque',
    presetAttackDesc: 'Formación ofensiva equilibrada con primera línea de infantería pesada.',
    presetGarrison: 'Guarnición',
    presetGarrisonDesc: 'Muro defensivo de infantería alta con flancos equilibrados.',
    presetBearTrap: 'Trampa del Oso',
    presetBearTrapDesc: 'Máximo daño de arqueros para el evento de la Trampa del Oso.',
    presetCustom: 'Personalizado',
    presetCustomDesc: 'Define tus propios porcentajes.',
    customRatioTitle: 'Configuración Personalizada',
    customRatioTotal: 'Total',
    customRatioNote: 'ℹ Las proporciones se normalizan automáticamente si no suman 100%.',

    troopRosterTitle: 'Lista de Tropas (T9 a T10-TG3)',
    troopRosterSubtitle: 'Ingresa tus tropas disponibles. Los niveles se priorizan automáticamente de T10-TG3 a T9.',
    troopMatrixTitle: 'Matriz de Desglose de Tropas',
    viewBaseStats: 'Ver Estadísticas Base',
    hideBaseStats: 'Ocultar Estadísticas',
    tier: 'Nivel',
    infantry: 'Infantería',
    cavalry: 'Caballería',
    archers: 'Arqueros',
    archersDps: 'Arqueros (DPS)',
    subtotal: 'Subtotal',
    totalPool: 'Reserva Total',
    rosterRatio: 'Proporción del Ejército:',
    none: 'Ninguno',

    marchCountTitle: 'Número Total de Marchas (1 a 7)',
    marchCountDescLead: '1 Marcha Líder + {n} Marchas Seguidoras',
    marchCountDescJoiner: '{n} Marchas Seguidoras',
    leadRallyToggle: 'Liderar un Rally (Marcha 1)',
    rallyLeadActive: 'Líder Activo',
    allJoiners: 'Todas Seguidoras',
    rallyCapacityLabel: 'Capacidad del Líder',
    customRallyRatioToggle: 'Proporción Personalizada de Rally',
    joinerCapacityLabel: 'Capacidad Máx. Seguidora',
    joinerCapacityNote: 'Cada marcha seguidora está limitada por esta capacidad.',

    strategyAdvisorTitle: 'Asesor Estratégico',
    advisorLowPool: 'Reserva < 450K',
    advisorWarning: 'Aviso: Tu reserva es baja para llenar un Rally completo Y mantener olas equilibradas. Reduce la marcha líder para maximizar el daño.',
    optimizeRallyBtn: 'Optimizar Líder ({cap})',
    oneTroopRallyBtn: 'Estrategia 1 Tropa',

    outputDashboardTitle: 'Panel de Resultados',
    squadsCount: '{n} Escuadrones · Distribución Equilibrada',
    balancedWavesDescLead: 'Marcha 1 Líder + {n} Olas Seguidoras (Arqueros repartidos equitativamente)',
    balancedWavesDescJoiner: 'Todas las {n} Olas equilibradas con reparto de DPS de arqueros',
    copyAllMarches: 'Copiar Todas las Marchas',
    copiedAllMarches: '¡Todas Copiadas!',
    deployed: 'Desplegadas',
    unassigned: 'Sin Asignar',
    fullyDeployed: 'Totalmente Desplegado',
    barracksReserve: '{n} tropas en cuartel (reserva)',
    viewReserves: 'Ver Reserva',
    hideReserves: 'Ocultar',
    marchDeployments: 'Despliegue de Marchas ({n} Marchas)',

    marchTitleLead: 'Marcha 1 (Líder del Rally)',
    marchTitleJoiner: 'Marcha {n} (Seguidora)',
    troops: 'tropas',
    cap: 'Cap',
    rallyLeadBadge: 'Líder de Rally',
    copyMarch: 'Copiar',
    copied: 'Copiado',
    copiedMarchToast: 'Marcha {title} copiada',

    guideTitle: 'Fórmulas y Guía de Combate del Oso',
    guideSubtitle: 'Estadísticas True Gold, multiplicadores de daño y distribución de olas.',
    baseStatsTitle: 'Estadísticas de Ataque Base (T9 a T10-TG3)',
    tierNameHeader: 'Nivel',
    archerRatioHeader: 'Multiplicador Arq',
    baseStatsNote: 'Los arqueros infligen ~4.0x más ataque que la Infantería y ~1.33x más que la Caballería en la Trampa del Oso.',
    allocationRulesTitle: 'Distribución Equilibrada de Olas',
    rule1Title: 'Prioridad de Niveles:',
    rule1Desc: 'Las tropas de mayor nivel (T10-TG3 a T9) se asignan primero para maximizar el puntaje.',
    rule2Title: 'Reparto Equitativo:',
    rule2Desc: 'Las tropas y arqueros se dividen equitativamente entre todas las seguidoras para evitar marchas vacías.',
    rule3Title: 'Relleno Automático:',
    rule3Desc: 'Si se agotan los arqueros, el espacio restante se completa con Caballería e Infantería.',
    closeGuide: 'Cerrar Guía',

    footerTagline: 'Herramienta de División de Tropas Kingshot',
    footerSpecs: 'T9 a T10-TG3 · Optimizado para Móviles',
    presetAppliedToast: 'Preajuste aplicado: {name}',
    oneTroopToast: 'Estrategia de Rally de 1 Tropa aplicada',
    optimizedToast: 'Capacidad del Líder ajustada a {cap}',
  },

  pt: {
    subBrand: 'Aliança TEA · Ferramenta Tática',
    appTitle: 'Calculadora de Tropas TEA Kingshot',
    appSubtitle: 'Otimizador de Armadilha do Urso (T9 a T10-TG3). Equilibra tropas entre todas as marchas seguidoras.',
    discordBtn: 'Entrar no Discord',
    guideBtn: 'Fórmulas e Mecânicas',

    presetsTitle: 'Formações Predefinidas (Inf / Cav / Arq)',
    presetAttack: 'Ataque',
    presetAttackDesc: 'Formação ofensiva equilibrada com linha de frente de infantaria pesada.',
    presetGarrison: 'Guarnição',
    presetGarrisonDesc: 'Muralha de infantaria alta com flancos equilibrados.',
    presetBearTrap: 'Armadilha do Urso',
    presetBearTrapDesc: 'Dano máximo de arqueiros para o evento do Urso.',
    presetCustom: 'Personalizado',
    presetCustomDesc: 'Defina suas próprias porcentagens.',
    customRatioTitle: 'Configuração Personalizada',
    customRatioTotal: 'Total',
    customRatioNote: 'ℹ Proporções são normalizadas automaticamente se não somarem 100%.',

    troopRosterTitle: 'Lista de Tropas (T9 a T10-TG3)',
    troopRosterSubtitle: 'Insira suas tropas disponíveis. Níveis são priorizados de T10-TG3 até T9.',
    troopMatrixTitle: 'Matriz de Tropas',
    viewBaseStats: 'Ver Estatísticas Base',
    hideBaseStats: 'Ocultar Estatísticas',
    tier: 'Nível',
    infantry: 'Infantaria',
    cavalry: 'Cavalaria',
    archers: 'Arqueiros',
    archersDps: 'Arqueiros (DPS)',
    subtotal: 'Subtotal',
    totalPool: 'Total Disponível',
    rosterRatio: 'Proporção do Exército:',
    none: 'Nenhum',

    marchCountTitle: 'Número Total de Marchas (1 a 7)',
    marchCountDescLead: '1 Marcha Líder + {n} Marchas Seguidoras',
    marchCountDescJoiner: '{n} Marchas Seguidoras',
    leadRallyToggle: 'Liderar um Rally (Marcha 1)',
    rallyLeadActive: 'Líder Ativo',
    allJoiners: 'Todas Seguidoras',
    rallyCapacityLabel: 'Capacidade do Líder',
    customRallyRatioToggle: 'Proporção Personalizada de Rally',
    joinerCapacityLabel: 'Capacidade Máx. Seguidora',
    joinerCapacityNote: 'Cada marcha seguidora é limitada por este teto.',

    strategyAdvisorTitle: 'Conselheiro Estratégico',
    advisorLowPool: 'Total < 450K',
    advisorWarning: 'Aviso: Sua reserva é baixa para encher um Rally completo E manter ondas equilibradas. Reduza o líder para melhor dano total.',
    optimizeRallyBtn: 'Otimizar Líder ({cap})',
    oneTroopRallyBtn: 'Estratégia 1 Tropa',

    outputDashboardTitle: 'Painel de Resultados',
    squadsCount: '{n} Esquadrões · Distribuição Equilibrada',
    balancedWavesDescLead: 'Marcha 1 Líder + {n} Ondas Seguidoras (Arqueiros divididos igualmente)',
    balancedWavesDescJoiner: 'Todas as {n} Ondas equilibradas com divisão de DPS de arqueiros',
    copyAllMarches: 'Copiar Todas as Marchas',
    copiedAllMarches: 'Todas Copiadas!',
    deployed: 'Implantadas',
    unassigned: 'Não Atribuídas',
    fullyDeployed: 'Totalmente Implantado',
    barracksReserve: '{n} tropas no quartel (reserva)',
    viewReserves: 'Ver Reserva',
    hideReserves: 'Ocultar',
    marchDeployments: 'Marchas Calculadas ({n} Marchas)',

    marchTitleLead: 'Marcha 1 (Líder do Rally)',
    marchTitleJoiner: 'Marcha {n} (Seguidora)',
    troops: 'tropas',
    cap: 'Cap',
    rallyLeadBadge: 'Líder de Rally',
    copyMarch: 'Copiar',
    copied: 'Copiado',
    copiedMarchToast: 'Marcha {title} copiada',

    guideTitle: 'Fórmulas e Guia de Combate do Urso',
    guideSubtitle: 'Atributos True Gold, multiplicadores de dano e distribuição de ondas.',
    baseStatsTitle: 'Ataque Base (T9 a T10-TG3)',
    tierNameHeader: 'Nível',
    archerRatioHeader: 'Multiplicador Arq',
    baseStatsNote: 'Arqueiros causam ~4.0x mais ataque que Infantaria e ~1.33x mais que Cavalaria contra o Urso.',
    allocationRulesTitle: 'Distribuição Equilibrada de Ondas',
    rule1Title: 'Prioridade de Nível:',
    rule1Desc: 'Tropas de maior nível (T10-TG3 a T9) são alocadas primeiro para pontuação máxima.',
    rule2Title: 'Divisão Igualitária:',
    rule2Desc: 'Tropas e arqueiros são divididos igualmente entre as seguidoras para evitar marchas vazias.',
    rule3Title: 'Preenchimento Automático:',
    rule3Desc: 'Se acabarem os arqueiros, a capacidade restante é preenchida com Cavalaria e Infantaria.',
    closeGuide: 'Fechar Guia',

    footerTagline: 'Ferramenta de Divisão de Tropas Kingshot',
    footerSpecs: 'T9 a T10-TG3 · Otimizado para Mobile',
    presetAppliedToast: 'Predefinição aplicada: {name}',
    oneTroopToast: 'Estratégia de Rally de 1 Tropa aplicada',
    optimizedToast: 'Capacidade do Líder ajustada para {cap}',
  },
};
