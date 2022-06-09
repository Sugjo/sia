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
		'left',
		'right',
		'center',
		'justify',
		'a',
		'image',
		'removeFormat'
	];
</script>

<Editor {actions} on:change  />