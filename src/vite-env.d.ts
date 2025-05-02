/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OWM_API_KEY: string; // OpenWeatherMap API Key
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
