import { info, post_view, term_view } from '@kucrut/wp-api-helpers';
import type { WP_REST_API_Attachment as Attachment, WP_REST_API_Taxonomy } from 'wp-types';
import type { z } from 'zod';

// See https://stackoverflow.com/a/54827898
export type BetterOmit< T, K extends PropertyKey > = { [ P in keyof T as Exclude< P, K > ]: T[ P ] };

export interface Favicon {
	href: string;
	rel: 'apple-touch-icon' | 'icon';
	sizes: string;
}

export interface TileImage {
	content: string;
	name: string;
}

export type WP_Info = z.infer< typeof info >;
export type WP_Post = z.infer< typeof post_view >;
export type WP_Taxonomy = z.infer< typeof taxonomy >;
export type WP_Term = z.infer< typeof term_view >;
export type WP_Post_Term = { taxonomy: WP_Taxonomy; terms: WP_Term[] };

export type WP_Page_Type = 'frontpage' | 'home' | 'archive' | 'single' | 'term_archive';

export interface WP_Page_Object {
	description?: string;
	page_num?: number;
	taxonomy?: WP_REST_API_Taxonomy;
	title?: string;
	type: WP_Page_Type;
}

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
