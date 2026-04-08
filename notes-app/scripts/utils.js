// utility function to check valid data
export const isValidNote = (title, content) => {
	if (!title || !content) return false;

	const trimmedTitle = title.trim();
	const trimmedContent = content.trim();

	if (!trimmedTitle || !trimmedContent) return false;

	return true;
};
