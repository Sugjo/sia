<script>
	import { getContext } from 'svelte';
	
	const settings = getContext("settings")

</script>

<h1>test</h1>
{$settings.theme}
test test page