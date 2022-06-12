import { handle } from '$lib/tools/handle';
import { set, ref, push, remove, getDatabase } from 'firebase/database';

const dbref = getDatabase();

export const post = async ({ request }) => {
	const { uid, name, from, text } = await request.json();

	const [createSuccess, createError] = await handle(
		set(push(ref(dbref, 'todo/' + uid)), {
			uid,
			name,
			from,
			text
		})
	);
	if (createError) {
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
			message: `Задание создано: ${createSuccess}`
		}
	};
};

export const del = async ({ request }) => {
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
};
