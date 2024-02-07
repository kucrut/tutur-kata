import { info, media_view, post_view, taxonomy_view, term_view } from '@kucrut/wp-api-helpers';
import type { z } from 'zod';

// See https://stackoverflow.com/a/54827898
export type BetterOmit< T, K extends PropertyKey > = { [ P in keyof T as Exclude< P, K > ]: T[ P ] };

export interface Favicon {
	href: string;
	rel: 'apple-touch-icon' | 'icon';
	sizes: string;
}

export interface NavItem {
	label: string;
	path: string;
}

export interface TileImage {
	content: string;
	name: string;
}

export type WP_Info = z.infer< typeof info >;
export type WP_Media = z.infer< typeof media_view >;
export type WP_Page_Type = 'frontpage' | 'home' | 'archive' | 'single' | 'term_archive';
export type WP_Post = z.infer< typeof post_view >;
export type WP_Post_Term = { taxonomy: WP_Taxonomy; terms: WP_Term[] };
export type WP_Taxonomy = z.infer< typeof taxonomy_view >;
export type WP_Term = z.infer< typeof term_view >;

export interface WP_Page_Object {
	description?: string;
	page_num?: number;
	taxonomy?: WP_Taxonomy;
	title?: string;
	type: WP_Page_Type;
}
