<script>
	import Input from '$lib/generic/Input.svelte';
	import Editor from 'cl-editor/src/Editor.svelte';
	import MdEditor from '$lib/generic/MdEditor.svelte';
	import ModalButton from '$lib/generic/ModalButton.svelte';

	let email;
	let error = {
		type: 'email',
		message: 'adsdsad'
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
	</ModalButton>
</section>
