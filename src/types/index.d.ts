export type wp_fetch = ( path: string, options?: RequestInit ) => Promise< Response >;

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
