<script>
	import { onMount } from 'svelte';

	/** @type {HTMLDialogElement} */
	let dialog;

	/** @param {MouseEvent} event */
	function handle_click_outside( event ) {
		if ( event.target === dialog ) {
			dialog.close();
		}
	}

	onMount( () => {
		dialog.showModal();
	} );
</script>

<svelte:body on:click={handle_click_outside} />
<dialog bind:this={dialog} class="popover" on:close><slot /></dialog>
