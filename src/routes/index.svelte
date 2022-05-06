<script>
	import { afterNavigate, goto } from '$app/navigation';
	import { settings } from '../store/settings.store';

	afterNavigate(() => goto($settings.homepage))
</script>

