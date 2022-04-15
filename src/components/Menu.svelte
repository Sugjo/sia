<script>
	import MenuItem from './MenuItem.svelte';

	export let type = 'desktop';

	let menuElements = [
		{
			title: 'Задания',
			icon: 'checklist',
			href: '/'
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
		}
	];
</script>

<aside class={type == 'desktop' ? '' : 'mobile'}>
	{#each menuElements as element}
		<MenuItem {type} href={element.href}>
			<span slot="title">{element.title}</span>
			<span class="material-icons" slot="icon"> {element.icon} </span>
		</MenuItem>
	{/each}
</aside>

<style>
	aside {
		grid-area: aside;
		height: min-content;
		width: min-content;

		top: var(--header-height);
		position: sticky;
		bottom: 0;
		left: 0;
		padding: 1rem;
		text-align: center;

		text-align: center;
		color: var(--text-color);

		display: flex;
		align-items: center;
		flex-direction: column;
		justify-self: end;
		gap: 10px;
	}

	.mobile {
		-webkit-box-shadow: var(--app-shadow);
		-moz-box-shadow: var(--app-shadow);
		box-shadow: var(--app-shadow);

		background-color: var(--second-color);
		flex-direction: row;
		justify-content: space-around;

        width: 100%;
	}
</style>
