<script>
	import { getContext } from 'svelte';
    import { logout } from "$lib/auth/auth";

    const app = getContext("app")

</script>

<section>
	<button on:click={logout}>Выйти</button>
	<button>Удалить аккаунт</button>
</section>
