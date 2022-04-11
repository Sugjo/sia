<script>
	import { goto } from '$app/navigation';
	import { app } from '../store/app.store';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($app.user) {
			goto(`${$app.homepage}`);
		} else {
			goto('auth');
		}
	});
</script>
