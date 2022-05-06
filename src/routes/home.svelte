<script>
	import Input from '$lib/generic/Input.svelte';

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

	{email}
</section>
