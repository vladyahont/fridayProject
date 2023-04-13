export const PATH = {
  HOME: '/',
  PROFILE: '/profile',
  REGISTRATION: '/registration',
  LOGIN: '/login',
  400: '/400',
  RECOVERY: '/forgot',
  PACKS: '/packs',
  CARDS: '/packs/:packId',
  CHECK_EMAIL: "/checkMail",
  NEWPASSWORD: "/set-new-password/:token?",
  LEARN_PACK: '/pack/learn/:packId',
} as const
