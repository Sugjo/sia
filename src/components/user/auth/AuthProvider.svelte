<script>
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/tools/firebase';
	import { goto } from '$app/navigation';

	onAuthStateChanged(auth, (user) => {
		if (!browser) return;
		if (user && $page.routeId?.includes('auth')) return goto('/');
		if (!user) return goto('/auth/signin');
	});
</script>

<slot />
