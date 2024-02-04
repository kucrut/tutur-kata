/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly PUBLIC_BLOG_PATH: string;
	readonly PUBLIC_DATETIME_LOCALE: string;
	readonly WP_API_APP_AUTH_TYPE: string;
	readonly WP_API_APP_AUTH: string;
	readonly WP_API_ROOT_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
