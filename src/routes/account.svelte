<script>
    import { logout } from "$lib/user/auth/auth";
	import Button from "$lib/generic/Button.svelte";

</script>

<section>
	<Button on:click={logout}>Выйти</Button>
	<Button variant="dsdsd">Удалить аккаунт</Button>
</section>

<style>
	section {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
</style>