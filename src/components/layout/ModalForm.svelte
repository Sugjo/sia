<script>
</script>

<div class="form-layout">
	<form on:submit|preventDefault>
		<slot />
		<div class="buttons">
			<slot name="buttons" />
		</div>
	</form>
</div>

<style>
	.form-layout {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.buttons {
		display: flex;
		margin-top: 2rem;
		gap: 0.5rem;
		width: 100%;
	}

	form {
		max-width: 800px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
