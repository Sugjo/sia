<script>
	import Input from '$lib/Input.svelte';

	let eamil;
	let error;
</script>

<section>
	<h1>Home</h1>
	<input type="text" bind:value={error} />

	<Input
		{error}
		inputType="email"
		bind:value={eamil}
		placeholder="Ваш Email"
		label="Email"
	/>

	{eamil}
</section>
