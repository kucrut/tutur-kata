import type { WP_REST_API_Attachment as Attachment } from 'wp-types';

// See https://stackoverflow.com/a/54827898
export type BetterOmit< T, K extends PropertyKey > = { [ P in keyof T as Exclude< P, K > ]: T[ P ] };

export type wp_fetch = ( path: string, options?: RequestInit ) => Promise< Response >;

export interface Favicon {
	href: string;
	rel: 'apple-touch-icon' | 'icon';
	sizes: string;
}

export interface TileImage {
	content: string;
	name: string;
}

export interface WP_Info {
	description: string;
	gmt_offset: number;
	home: string;
	name: string;
	site_icon: number;
	site_logo: number;
	timezone_string: string;
	url: string;
}

export type WP_Page_Type = 'frontpage' | 'blog_archive' | 'blog_single';

export type WP_Media_Orientation = 'landscape' | 'portrait';

export interface WP_Media_Size {
	height: number;
	width: number;
	url: string;
	orientation: WP_Media_Orientation;
}

export interface WP_REST_API_Media_Size extends BetterOmit< WP_Media_Size, 'url' > {
	file: string;
	filesize: number;
	source_url: string;
	mime_type: string;
}

export interface WP_REST_API_Media_Details {
	file: string;
	filesize: number;
	height: number;
	original_image: string;
	width: number;
	sizes: {
		full: WP_REST_API_Media_Size;
		large?: WP_REST_API_Media_Size;
		medium?: WP_REST_API_Media_Size;
		thumbnail?: WP_REST_API_Media_Size;
		[ k: string ]: WP_REST_API_Media_Size;
	};
}

export interface WP_REST_API_Media extends BetterOmit< Attachment, 'alt' | 'media_details' > {
	media_details: WP_REST_API_Media_Details;
}
