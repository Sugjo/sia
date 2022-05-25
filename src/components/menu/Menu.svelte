<script>
	import Button from '$lib/generic/Button.svelte';

	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';

	import MenuItem from './MenuItem.svelte';

	export let type = 'desktop';

	let menuElements = [
		{
			title: 'Задания',
			icon: 'checklist',
			href: '/todo'
		},
		{
			title: 'Группы',
			icon: 'group',
			href: '/groups'
		},
		// {
		// 	title: 'Чат',
		// 	icon: 'chat_bubble_outline',
		// 	href: '/chat'
		// },
		{
			title: 'Аккаунт',
			flyout: true,
			icon: 'account_circle',
			href: '/account'
		}

		// {
		// 	title: 'Тесты',
		// 	icon: 'science',
		// 	href: '/test'
		// }
	];
</script>

<aside class={type == 'desktop' ? 'desktop' : 'mobile'}>
	{#each menuElements as element}
		<MenuItem {type} href={element.href}>
			<span slot="title">{element.title}</span>
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
	}

	.desktop {
		grid-auto-flow: row;
	}

	.mobile {
		position: sticky;
		bottom: 0;
		width: 100%;

		grid-auto-flow: column;
		-webkit-box-shadow: var(--app-shadow);
		-moz-box-shadow: var(--app-shadow);
		box-shadow: var(--app-shadow);

		background-color: var(--second-color);
		flex-direction: row;
	}
</style>
