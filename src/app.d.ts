/* eslint-disable space-in-parens */

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		wp_fetch: import('$types').wp_fetch;
		wp_info: import('$types').WP_Info;
	}
	// interface PageData {}
	// interface PageError {}
	// interface Platform {}
}
