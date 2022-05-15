<script>
	import Button from './generic/Button.svelte';

	export let icon = '/img/group.png';
	export let userCount = 0;
	export let name;
</script>

<div class="card">
	<img src={icon} alt="" width="50" height="50" />
	<div class="card-body">
		<div class="body-title">
			{name}
		</div>
		<div class="body-title">
			Участников {userCount}
		</div>
	</div>
	<div class="card-footer">
		<Button variant="hidden" icon="more_horiz"/>
	</div>
</div>

<style>
	.card {
		display: grid;
		grid-template-columns: min-content 1fr min-content;
	}

	.card-body {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.card-footer {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: end;
	}
</style>
