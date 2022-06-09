import { settings } from '../../store/settings.store';

export const closeAllModal = () => {
	settings.update((e) => {
		return { ...e, closeModal: true };
	});
};
