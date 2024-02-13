import { type WP_Taxonomy } from '@kucrut/wp-api-helpers';

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

export type WP_Page_Type = 'frontpage' | 'home' | 'archive' | 'single' | 'term_archive';

export interface WP_Page_Object {
	description?: string;
	page_num?: number;
	taxonomy?: WP_Taxonomy;
	title?: string;
	type: WP_Page_Type;
}
