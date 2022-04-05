<script context="module">
	/** @type {import('@sveltejs/kit').Handle} */
	export async function handle({ event, resolve }) {
		if (event.request.url.startsWith('/home')) {
			return new Response('custom response');
		}

		const response = await resolve(event, {ssr: false});
		return response;
	}
	export const prerender = true;
	export async function load({ params, fetch, session, stuff }) {
		const url = `https://jsonplaceholder.typicode.com/todos/${params.id}`;
		const response = await fetch(url);
		return {
			status: response.status,
			props: {
				article: response.ok && (await response.json())
			}
		};
	}
</script>

<script>
	import { getContext } from 'svelte';

	export let article;
	
	const settings = getContext("settings")

</script>

{$settings.theme}

<h1 style="color: {article.completed ? "limegreen" : "maroon"} ;">{article.title}</h1>

<a href="{article.id + 1}">Next</a>
