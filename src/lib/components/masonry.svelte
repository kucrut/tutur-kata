<script>
	// Credit: https://css-tricks.com/a-lightweight-masonry-solution/
	import { onMount } from 'svelte';

	/** @type {HTMLDivElement} */
	let el;
	let cols = 0;
	/** @type {number} */
	let gap;

	function layout() {
		const items = el.querySelectorAll( 'figure' );

		if ( ! items.length ) {
			return;
		}

		gap = parseFloat( getComputedStyle( el ).gap );

		/* get the post relayout number of columns */
		const new_cols = getComputedStyle( el ).gridTemplateColumns.split( ' ' ).length;

		if ( new_cols === cols ) {
			return;
		}

		cols = new_cols;

		items.forEach( ( item, i ) => {
			item.style.removeProperty( 'margin-top' );

			if ( cols < 2 || i <= cols ) {
				return;
			}

			const prev_fin = items[ i - cols ].getBoundingClientRect().bottom;
			const new_margin = prev_fin + gap - item.getBoundingClientRect().top;

			if ( new_margin < gap * -1 ) {
				item.style.marginTop = `${ new_margin }px`;
			}
		} );
	}

	onMount( layout );
</script>

<svelte:window on:resize={layout} />

<div class="masonry" bind:this={el}><slot /></div>
