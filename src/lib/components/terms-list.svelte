<script>
	import { decode_entities } from '$lib/utils/simple-entity-decode';

	let cls = '';

	export { cls as class };
	/** @type {import('wp-types').WP_REST_API_Taxonomy} */
	export let taxonomy;
	/** @type {import('wp-types').WP_REST_API_Term[]} */
	export let terms;

	// TODO: Accept item_component prop.

	$: classes = `terms-list ${ cls }`.trim();
</script>

<slot name="before-list" {taxonomy} {terms} />

<ul
	aria-label={decode_entities( taxonomy.name )}
	class={classes}
	data-hierarchical={taxonomy.hierarchical}
	data-taxonomy={taxonomy.slug}
>
	{#each terms as term}
		<li>{decode_entities( term.name )}</li>
	{/each}
</ul>

<slot name="after-list" {taxonomy} {terms} />
