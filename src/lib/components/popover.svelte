<script>
	import { onMount } from 'svelte';

	/** @type {HTMLDialogElement} */
	let el;

	/** @param {MouseEvent} event */
	function handle_click_outside( event ) {
		if ( event.target === el ) {
			el.close();
		}
	}

	onMount( () => {
		el.showModal();
	} );
</script>

<svelte:body on:click={handle_click_outside} />
<dialog bind:this={el} class="popover" on:close><slot /></dialog>
