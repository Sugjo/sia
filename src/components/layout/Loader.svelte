<script>
	import { onMount } from 'svelte';

	export let background;
	export let color;

	let isLoading = true;

	onMount(() => {
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="loader-wrapper" style="--loadingBackground: {background}; --loadingColor: {color}">
		Загрузка
		<div class="loader">
			<div />
			<div />
			<div />
		</div>
	</div>
{/if}

<slot />

<style>
	.loader-wrapper {
		position: fixed;
		color: var(--loadingColor);
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		z-index: 10;
		width: 100%;
		height: 100%;
	}

	.loader-wrapper::after {
		content: '';
		background-color: var(--loadingBackground);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		position: fixed;
		z-index: -5;
	}

	.loader {
		position: relative;
		width: 80px;
		height: 80px;
	}

	.loader div {
		z-index: 100;
		position: absolute;
		top: 33px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: var(--loadingColor);
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.loader div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.loader div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.loader div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.loader div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
</style>
