<script>
	import Input from '$lib/generic/Input.svelte';
	import Button from '$lib/generic/Button.svelte';
import FlyoutButton from '$lib/generic/FlyoutButton.svelte';

	let email;
	let error = {
		type: 'email',
		message: 'adsdsad'
	};
</script>

<section>
	<input type="text" bind:value={error.message} />

	<Input
		label="Email"
		name="email"
		inputType="email"
		placeholder="Введите свой Email"
		{error}
		bind:value={email}
		required
	/>

	<Button on:click icon="refresh">dsd</Button>
	<Button on:click icon="refresh" />

	adsad

	{email}
</section>
