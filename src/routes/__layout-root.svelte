<script>
	import AuthProvider from '$lib/user/auth/AuthProvider.svelte';
	import Header from '$lib/generic/Header.svelte';
	import Loader from '$lib/layout/Loader.svelte';
	import ThemeSwitsh from '$lib/layout/ThemeSwitsh.svelte';
	import { settings } from '../store/settings.store';
	import { setContext } from 'svelte';
	import GetDeviceType from '$lib/tools/GetDeviceType.svelte';

	setContext('settings', settings);
</script>

<GetDeviceType />

<ThemeSwitsh theme={$settings.theme}>
	<AuthProvider>
		<Loader background="#293035" color="#fff">
			<Header />
			<slot />
		</Loader>
	</AuthProvider>
</ThemeSwitsh>
