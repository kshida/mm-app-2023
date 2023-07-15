/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TEXT_ALIVE_TOKEN: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}