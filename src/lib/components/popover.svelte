<script>
	import { onMount } from 'svelte';

	/** @type {HTMLDialogElement} */
	let el;

	onMount( () => {
		el.showModal();
	} );
</script>

<dialog bind:this={el} class="popover" on:close><slot /></dialog>
