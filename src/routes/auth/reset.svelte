<script>
	import Button from '$lib/generic/Button.svelte';
	import Input from '$lib/generic/Input.svelte';
	import Error from '$lib/generic/Error.svelte';
	import AuthLayout from '$lib/layout/AuthLayout.svelte';

	let email;
	let error;
	let canSubmit = true;

	const passwordReset = async () => {
		canSubmit = false;
		error = null;
		const res = await fetch('/api/auth/reset', {
			method: 'POST',
			body: JSON.stringify({ email })
		});

		if (res.ok) {
			// TODO сделать модалку с увидомлением
		} else {
			error = await res.json();
		}

		canSubmit = true;
	};
</script>

<AuthLayout on:submit={passwordReset}>
	<svelte:fragment slot="h1">Востановление пароля 🔏 <br /> Sia HomeWork</svelte:fragment>
	<svelte:fragment slot="h2">Пристанище ваших домашних заданй</svelte:fragment>
	<Input
		label="Email"
		name="email"
		inputType="email"
		placeholder="Введите свой Email"
		{error}
		bind:value={email}
		required
	/>
	<Button type="submit" disabled={!canSubmit}>Востановить</Button>
	<Error name="other" {error} />
	<svelte:fragment slot="footer">
		<Button href="/auth/signin" variant="link" fluid>Назад</Button>
	</svelte:fragment>
</AuthLayout>
