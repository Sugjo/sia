<script>
	import { googleAuth } from '$lib/user/auth/auth';

	let error;
</script>

<button class="button-google" on:click={googleAuth}>
	<img src="/img/google.png" alt="" width="15" height="15" /> Продолжить с помощю Google
</button>
{#if error}
	<span class="error-message">{error.message}</span>
{/if}
<div class="or">или</div>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;

		padding: 0.5rem;

		cursor: pointer;
	}

	.button-google {
		background-color: #fff;
		border-color: #000;
		border-width: 1px;
		border-radius: 5px;
	}

	.or {
		display: flex;
		align-items: center;
		margin: 1rem 0;
	}

	.or::before {
		content: '';
		height: 1px;
		width: 100%;
		border-bottom: 1px #000 solid;
		margin-right: 30px;
	}

	.or::after {
		content: '';
		height: 1px;
		width: 100%;
		border-bottom: 1px #000 solid;
		margin-left: 30px;
	}
</style>
