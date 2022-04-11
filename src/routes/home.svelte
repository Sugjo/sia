<script>
	import { app } from '../store/app.store';
	import { goto } from '$app/navigation';
</script>

<section>
	<h1>Home</h1>

	<img src={$app.user?.photoURL} alt="" />

	<button
		on:click={() => {
			$app.user = null;
			goto('/');
		}}>Выход</button
	>
</section>

<style>
	h1 {
		text-align: center;
	}

	img {
		border-radius: 50%;
	}
</style>
