const __ALLOWED_ORIGINS__: string[] = [
    'https://rasp.cullfy.ru',
    'http://dev.cullfy.ru',
    'http://45.12.72.131'
]

const validateOrigin = (origin: string): string => {
    return __ALLOWED_ORIGINS__.includes(origin) ? '*' : '';
}

export function getCspHeaders(origin: string): [string, string][] {
  if (!validateOrigin(origin)) {
    return [];
  }

  return [
    ["Access-Control-Allow-Credentials", "true"],
    ["Access-Control-Allow-Origin", origin],
    ["Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT"],
    ["Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"],
  ]
}