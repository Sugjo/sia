<script>
	export let title;
</script>

<section>
	<div class="container header">
		<h1>{title}</h1>
		<slot name="header" />
	</div>
	<div class="page-body">
		<slot />
	</div>
</section>

<style>
	.header {
		grid-area: navigation;
		display: flex;
		justify-content: space-between;
	}

	section {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-rows: min-content min-content;
		grid-template-areas:
			'navigation'
			'page-body';
		gap: 1rem;
	}

	h1 {
		margin: 0;
	}
</style>
