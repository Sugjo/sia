<script>
	import { afterNavigate, goto } from '$app/navigation';
	import { app } from '../store/app.store';

	afterNavigate(() => goto($app.homepage))
</script>