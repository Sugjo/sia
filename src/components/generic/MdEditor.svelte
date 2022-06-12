<script>
	import Editor from 'cl-editor/src/Editor.svelte';
	let actions = [
		'b',
		'i',
		'u',
		'strike',
		'sup',
		'sub',
		'ol',
		'ul',
		'hr',
		'a',
		'removeFormat'
	];
</script>

<Editor {actions} on:change  />