/* eslint-disable space-in-parens */

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		wp_api_auth: string;
		wp_api_url: string;
		wp_info: import('$types').WP_Info;
	}
	// interface PageData {}
	// interface Platform {}
}
