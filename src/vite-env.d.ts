interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENVIRONMENT: 'dev' | 'uat' | 'prod'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
