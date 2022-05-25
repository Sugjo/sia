<script>
	export let time = '00:00';
	export let count = "0";
    export let icon = "/img/group.png";
	export let name;
	export let latsMessage;
</script>

<div class="card">
	<img src="{icon}" alt="" width="50" height="50" />
	<div class="card-body">
		<div class="body-title">
			{name}
		</div>
		<div class="body-last-message" style={latsMessage ? '' : 'visibility: hidden'}>
			{latsMessage}
		</div>
	</div>
	<div class="card-footer">
		<div class="footer-time">
			{time}
		</div>
		<div class="footer-message-count" style={count ? '' : 'visibility: hidden'}>
			{count}
		</div>
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
		justify-content: space-around;
		align-items: end;
	}

	.footer-message-count {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: brown;
		color: #fff;

		min-width: 17px;
		font-size: 10px;
		padding: 2px 5px;
		border-radius: 25px;
	}
</style>
