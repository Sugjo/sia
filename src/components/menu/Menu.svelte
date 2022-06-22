<script>
	import { getContext } from 'svelte';
	import MenuItem from './MenuItem.svelte';

	const settings = getContext('settings');

	let menuElements = [
		{
			title: 'Задания',
			icon: 'checklist',
			href: '/todo'
		},
		// {
		// 	title: 'Группы',
		// 	icon: 'group',
		// 	href: '/groups'
		// },
		// {
		// 	title: 'Чат',
		// 	icon: 'chat_bubble_outline',
		// 	href: '/chat'
		// },
		{
			title: 'Аккаунт',
			icon: 'account_circle',
			href: '/account'
		},

		// {
		// 	title: 'Тесты',
		// 	icon: 'science',
		// 	href: '/test'
		// }
	];
</script>

<aside class={$settings?.deviceType == 'desktop' ? 'desktop' : 'mobile'}>
	{#each menuElements as element}
		<MenuItem type={$settings?.deviceType} href={element.href}>
			<svelte:fragment slot="title">{element.title}</svelte:fragment>
			<span class="material-icons" slot="icon"> {element.icon} </span>
		</MenuItem>
	{/each}
</aside>

<style>
	aside {
		display: grid;
		gap: 4px;
		grid-template-rows: max-content;

		grid-area: aside;
		height: min-content;
		justify-self: end;
		width: 80%;

		top: calc(var(--header-height) + 1rem);
		position: sticky;
		bottom: 0;
		left: 0;
		text-align: center;
		z-index: 12;
	}

	.desktop {
		grid-auto-flow: row;
	}

	.mobile {
		position: sticky;
		bottom: 0;
		width: 100%;

		grid-auto-flow: column;
		box-shadow: var(--app-shadow);

		background-color: var(--main-color);
		flex-direction: row;
	}
</style>
