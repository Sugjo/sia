<script>
	import Input from '$lib/generic/Input.svelte';
	import Editor from 'cl-editor/src/Editor.svelte';
	import MdEditor from '$lib/generic/MdEditor.svelte';
	import ModalButton from '$lib/generic/ModalButton.svelte';
	import Button from '$lib/generic/Button.svelte';
	import { closeAllModal } from '$lib/tools/closeAllModal';

	let email;
	let error = {
		type: 'email',
		message: ''
	};
</script>

<section>
	<input type="text" bind:value={error.message} />

	<Input
		label="Email"
		name="email"
		inputType="email"
		placeholder="Введите свой Email"
		{error}
		bind:value={email}
		required
	/>

	<ModalButton icon="add">
		<svelte:fragment slot="title">Добавить задание</svelte:fragment>
		<MdEditor />
		<Button on:click={closeAllModal}>Закрыть</Button>
	</ModalButton>

	<ModalButton icon="add">
		<svelte:fragment slot="title">Добавить задание</svelte:fragment>
		<MdEditor />
		<Button on:click={closeAllModal}>Закрыть</Button>
	</ModalButton>
</section>
