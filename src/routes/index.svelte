<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { settings } from '../store/settings.store';

	if (browser) goto($settings.homepage || '/home');
</script>
