/**
 * BigFana — Spanish (LatAm) copy dictionary
 *
 * This is the SOURCE OF TRUTH shape for all copy dictionaries.
 * All other locale files (en.ts, pt.ts) must satisfy `CopyDictionary`.
 *
 * Scope: navigation labels, repeated buttons, section titles,
 *        tabs, empty states, and reusable UI labels.
 *        Page-level narrative / match data remains inline for now.
 */

export const es = {
  // ─── Navigation ──────────────────────────────────────────────────────────
  nav: {
    home: "Inicio",
    matches: "Partidos",
    events: "Eventos",
    community: "Comunidad",
    profile: "Perfil",
    myTickets: "Mis entradas",
    wallet: "Cartera",
    rewards: "Recompensas",
    favorites: "Favoritos",
    settings: "Configuración",
    helpSupport: "Ayuda y soporte",
    quickAccess: "Acceso rápido",
    collapse: "Colapsar",
  },

  // ─── Theme / Appearance ───────────────────────────────────────────────────
  theme: {
    dark: "Oscuro",
    light: "Claro",
    auto: "Auto",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    appearance: "Apariencia",
  },

  // ─── Auth ─────────────────────────────────────────────────────────────────
  auth: {
    guest: "Invitado",
    guestUser: "Usuario invitado",
    signIn: "Iniciar sesión",
    signInForAccess: "Inicia sesión para acceso completo",
    signInForProfile: "Inicia sesión para acceder a tu perfil",
    createAccount: "Crear cuenta",
    signOut: "Cerrar sesión",
  },

  // ─── Common / Shared ──────────────────────────────────────────────────────
  common: {
    live: "En vivo",
    liveNow: "EN VIVO",
    seeAll: "Ver todos",
    watch: "Ver",
    watchLive: "Ver en vivo",
    watchHighlights: "Ver highlights",
    startWatching: "Comenzar a ver",
    join: "Unirse",
    joinLive: "Unirse en vivo",
    trending: "Tendencias",
    trendingNow: "Tendencias ahora",
    upcoming: "Próximos",
    all: "Todos",
    registerNow: "Registrarme",
    matchStats: "Estadísticas",
    viewSchedule: "Ver calendario",
    loading: "Cargando...",
    new: "Nuevo",
    searchPlaceholder: "Busca partidos, eventos, fans...",
  },

  // ─── Filters ──────────────────────────────────────────────────────────────
  filters: {
    all: "Todos",
    live: "En vivo",
    upcoming: "Próximos",
    football: "Fútbol",
    basketball: "Básquetbol",
    trending: "Tendencias",
  },

  // ─── Home page ───────────────────────────────────────────────────────────
  home: {
    heroTitle: "La pasión,",
    heroTitleAccent: "Reinventada.",
    heroSubtitle:
      "Vive el fútbol como nunca antes. Marcadores en vivo, contenido exclusivo y una comunidad global de fans apasionados.",
    liveMatches: "Partidos en vivo",
    activeFans: "Fans activos",
    eventsToday: "Eventos hoy",
    fansWatchingNow: "fans viendo ahora",
    fanPulse: "Pulso del fan",
    moreLive: "Más en vivo",
    comingUp: "Próximamente",
    comingUpSubtitle: "No te pierdas estos partidos",
    explore: "Explorar",
    leagues: "Ligas",
    leaguesDesc: "Sigue competiciones",
    communityLabel: "Comunidad",
    communityDesc: "Únete a debates",
    liveEvents: "Eventos en vivo",
    liveEventsDesc: "Acción en tiempo real",
    whatIsHot: "Lo más popular",
  },

  // ─── Matches page ─────────────────────────────────────────────────────────
  matches: {
    pageTitle: "Partidos",
    todaysMatches: "Partidos de hoy",
    todaysMatchesSubtitle: "Partidos en vivo y próximos",
  },

  // ─── Events page ──────────────────────────────────────────────────────────
  events: {
    pageTitle: "Eventos",
    upcomingEvents: "Próximos eventos",
    upcomingEventsSubtitle: "Experiencias y encuentros para fans",
  },

  // ─── Community page ───────────────────────────────────────────────────────
  community: {
    pageTitle: "Comunidad",
    members: "Miembros",
    postsToday: "Posts hoy",
    fanGroups: "Grupos de fans",
    fanGroupsSubtitle: "Conecta con los hinchas",
    postsCount: "posts hoy",
    recentDiscussions: "Debates recientes",
    joinConversationTitle: "Únete a la conversación",
    joinConversationDesc:
      "Inicia sesión para participar en debates y conectar con otros fans.",
  },

  // ─── Profile page ─────────────────────────────────────────────────────────
  profile: {
    pageTitle: "Perfil",
    settingsSection: "Configuración",
    notifications: "Notificaciones",
    privacy: "Privacidad",
    preferences: "Preferencias",
    accountSection: "Cuenta",
  },
};

export type CopyDictionary = typeof es;
