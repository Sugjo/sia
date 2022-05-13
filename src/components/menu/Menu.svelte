<script>
	import MenuItem from './MenuItem.svelte';

	export let type = 'desktop';

	let menuElements = [
		{
			title: 'Задания',
			icon: 'checklist',
			href: '/home'
		},
		{
			title: 'Чат',
			icon: 'chat_bubble_outline',
			href: '/chat'
		},
		{
			title: 'Аккаунт',
			icon: 'account_circle',
			href: '/account'
		},
		{
			title: 'Настройки',
			icon: 'settings',
			href: '/settings'
		},
		{
			title: 'Группы',
			icon: 'group',
			href: '/groups'
		}
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

		color: var(--text-color);
	}

	.desktop {
		grid-auto-flow: row;
	}

	.mobile {
		grid-auto-flow: column;
		-webkit-box-shadow: var(--app-shadow);
		-moz-box-shadow: var(--app-shadow);
		box-shadow: var(--app-shadow);

		background-color: var(--second-color);
		flex-direction: row;

		width: 100%;
	}
</style>
