/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_API_URL?: string;
  readonly VITE_BOOKING_API_KEY?: string;
  readonly VITE_BOOKING_REQUEST_TIMEOUT_MS?: string;
  /** Google Analytics measurement ID. Analytics is skipped entirely when unset. */
  readonly VITE_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
