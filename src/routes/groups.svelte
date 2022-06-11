<script context="module">
	import { auth, db } from '$lib/user/firebase';
	import { doc, getDoc } from 'firebase/firestore';

	export async function load() {
		return {
			props: {
				groupCb: function (cb = (e) => {}) {
					auth.onAuthStateChanged(async (user) => {
						if (!user?.uid) return;
						const citiesRef = doc(db, 'users', user?.uid);
						const userData = await getDoc(citiesRef);
						const groups = [];
						for await (const group of userData.data().groups) {
							let data = (await getDoc(group)).data();
							console.log(group.id);
							if (!data) {
								groups.push({
									name: 'Группа удалена',
									icon: 'http://cdn.onlinewebfonts.com/svg/img_218950.png',
									userCount: 0,
									id: group.id
								});
								continue;
							}
							groups.push({ ...data, id: group.id });
						}
						cb(groups);
					});
				}
			}
		};
	}
</script>

<script>
	import { createGroup } from '$lib/user/groups/groups';
	import Button from '$lib/generic/Button.svelte';
	import GroupCard from '$lib/cards/GroupCard.svelte';

	export let groupCb;

	let isLoad = true;
	let groupsData;

	$: console.log(groupsData);

	$: groupCb((e) => {
		groupsData = e;
		isLoad = false;
	});
</script>

<section>
	<div class="container navigation">
		<h1>Группы</h1>
		<Button on:click={createGroup} icon="add" />
	</div>
	<div class="groups">
		{#if groupsData}
			{#each groupsData as { icon, userCount, name, id }}
				<GroupCard {icon} {userCount} {name} {id} />
			{/each}
		{:else if isLoad}
			Загрузка...
		{:else}
			Заданий нет!
		{/if}
	</div>
</section>

<style>
	section {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-rows: min-content min-content;
		grid-template-areas:
			'navigation'
			'groups';
		gap: 1rem;
	}

	.navigation {
		grid-area: navigation;
		display: flex;
		justify-content: space-between;
	}

	.groups {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		padding: 1rem;
		grid-area: groups;
	}

	h1 {
		margin: 0;
	}
</style>
