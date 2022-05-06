<script>
	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/user/firebase';
	import { goto } from '$app/navigation';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) return goto('/');
			if (!user) return goto('/auth/signin');
		});
	});
</script>

<slot />
