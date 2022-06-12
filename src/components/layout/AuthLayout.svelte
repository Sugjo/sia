<h1><slot name="h1" /></h1>
<h2><slot name="h2" /></h2>

<form class="email" on:submit|preventDefault>
	<slot />
</form>

<div class="auth-footer">
	<slot name="footer" />
</div>

<style>
	h1,
	h2 {
		text-align: center;
		font-weight: 400;
	}

	h1 {
		font-size: 24px;
		margin: 0;
	}

	h2 {
		font-size: 14px;
		margin-bottom: 2rem;
	}

	.email {
		display: flex;
		flex-direction: column;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.auth-footer {
		display: flex;
		justify-content: center;
        align-items: center;
		margin-top: 1.5rem;
	}
</style>
