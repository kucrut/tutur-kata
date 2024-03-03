/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly PUBLIC_BLOG_PATH: string;
	readonly PUBLIC_DATETIME_LOCALE: string;
	readonly PUBLIC_RESUME_URL: string;
	readonly WP_API_APP_AUTH_TYPE: string;
	readonly WP_API_APP_AUTH: string;
	readonly WP_API_ROOT_URL: string;
	readonly WP_BLOG_POST_TYPE: string;
	readonly WP_FRONTPAGE_ID: string;
	readonly WP_GALLERY_CATEGORY_IDS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
