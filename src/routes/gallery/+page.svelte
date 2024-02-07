<script>
	import Image from '$lib/components/image.svelte';
	import Masonry from '$lib/components/masonry.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	<h1>Gallery</h1>

	{#if data.items.length}
		<Masonry>
			{#each data.items as item}
				{#if item.media_type === 'video'}
					<!-- svelte-ignore a11y-media-has-caption -->
					<figure>
						<video controls width="400px" src={item.source_url}>
							<a download href={item.source_url}>{item.title}</a>
						</video>
						<figcaption>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html item.caption.rendered}
						</figcaption>
					</figure>
				{:else if item.media_type === 'image' && item.media_details.sizes}
					<Image media={item} />
				{:else}
					<figure>
						<a download href={item.source_url}>{item.title}</a>
					</figure>
				{/if}
			{/each}
		</Masonry>
	{:else}
		<p>No media found.</p>
	{/if}
</div>
