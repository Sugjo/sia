import { handle } from '$lib/tools/handle';
import { set, ref, push, remove, getDatabase } from 'firebase/database';

const dbref = getDatabase();

export async function post({ request }) {
	const { uid, name, from, text } = await request.json();

	const [, error] = await handle(
		set(push(ref(dbref, 'todo/' + uid)), {
			uid,
			name,
			from,
			text
		})
	);

	if (error) {
		return {
			status: 400,
			body: {
				message: `Error: ${error.message}`
			}
		};
	}

	return {
		status: 200,
		body: {
			message: `Task created`
		}
	};
}

export async function del({ request }) {
	const { id, uid } = await request.json();
	const [delSuccess, delError] = await handle(remove(ref(dbref, `todo/${uid}/${id}`)));

	if (delError) {
		return {
			status: 400,
			body: {
				message: `Ошибка: ${createError}`
			}
		};
	}

	return {
		status: 200,
		body: {
			message: `Задание удалено : ${delSuccess}`
		}
	};
}
