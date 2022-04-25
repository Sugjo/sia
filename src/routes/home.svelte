<script>
	import Input from '$lib/Input.svelte';

	let email;
	let error = {
		type: 'email',
		message: "adsdsad"
	};
</script>

<section>
	<h1>Home</h1>
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
