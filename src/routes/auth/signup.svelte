<script>
	import GoogleAuth from '$lib/user/auth/GoogleAuth.svelte';
	import Button from '$lib/generic/Button.svelte';
	import Input from '$lib/generic/Input.svelte';
	import AuthLayout from '$lib/layout/AuthLayout.svelte';
	import Error from '$lib/generic/Error.svelte';

	let email;
	let password;
	let error;

	const submitHandler = async () => {
		const res = await fetch('/api/auth/signup', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		});

		if (res.ok) {
			//TODO сделать сообщение об успешной регистрации
		} else {
			error = await res.json();
		}
	};
</script>

<svelte:head>
	<title>Добро пожаловать | Sia HomeWork</title>
</svelte:head>

<AuthLayout on:submit={submitHandler}>
	<svelte:fragment slot="h1">Добро пожаловать в Sia HomeWork 👋</svelte:fragment>
	<svelte:fragment slot="h2">Пристанище ваших домашних заданй</svelte:fragment>
	<GoogleAuth />
	<Input
		label="Email"
		name="email"
		inputType="email"
		placeholder="Введите свой Email"
		{error}
		bind:value={email}
		required
	/>
	<Input
		label="Пароль"
		name="password"
		inputType="password"
		placeholder="Введите пароль"
		{error}
		bind:value={password}
		required
	/>
	<Button type="submit">Зарегистрироваться</Button>
	<Error {error} name="other" />
	<svelte:fragment slot="footer">
		Есть аккаунт? <Button href="/auth/signin" variant="link">Войти</Button>
	</svelte:fragment>
</AuthLayout>
