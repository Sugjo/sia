<script>
	import { createGroup } from "$lib/user/groups/groups";
</script>

<section>
	<div class="container navigation">
		<h1>Группы</h1>
		<button on:click="{createGroup}">Создать группу</button>
	</div>
	<div class="container groups">fdf</div>
</section>

<style>
	section {
		height: 100%;

		display: grid;
		grid-template-rows: min-content 1fr;
		grid-template-areas:
		"navigation"
		"groups";
		gap: 1rem;
	}

	.navigation {
		grid-area: navigation;
		display: flex;
		justify-content: space-between;
	}

	.groups {
		height: 100%;
		width: 100%;
		grid-area: groups;
	}

	h1 {
		margin: 0;
	}
</style>
