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
	export let article;
	console.log(article);
</script>

<h1>home</h1>
