<form class="email" on:submit|preventDefault>
	<label for="email">Email</label>
	<input type="email" name="email" placeholder="Введите свой Email" />
	<label for="password">Пароль</label>
	<input type="email" name="password" placeholder="Введите пароль" />
	<button class="next"> Зарегистрироваться </button>
</form>

<p>Есть аккаунт? <a href="/login">Войти</a></p>

<style>
	a {
		text-decoration: none;
	}
	.email {
		display: flex;
		flex-direction: column;
	}

	.email label {
		font-size: 14px;
		color: #575757;
	}

	.email input,
	button {
		height: 40px;

		background: #ffffff;
		border: 1px solid #d0d0d0;
		border-radius: 5px;

		padding: 10px;

		margin: 0.5rem 0;
	}

	.next {
		background: rgba(255, 155, 155, 0.29);
		color: #f93333;
		border: 1px solid #f78a8a;
		border-radius: 5px;
	}

	p {
		opacity: .8;
		margin-top: 2rem;
		text-align: center;
	}
</style>
