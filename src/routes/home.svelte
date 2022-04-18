<script>
	import Input from '$lib/Input.svelte';

	let value;
	let error;
</script>

<section>
	<h1>Home</h1>
	<input type="text" bind:value={error} />

	<Input {error} type="email" {value} placeholder="Ваш Email" label="Email"/>
	<Input {error} type="email" {value} placeholder="Ваш Email" label="Email"/>

	{value}
</section>
