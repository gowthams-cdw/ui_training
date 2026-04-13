// utility function to check valid data
export const isValidNote = (title, content) => {
	if (!title || !content) return false;

	const trimmedTitle = title.trim();
	const trimmedContent = content.trim();

	if (!trimmedTitle || !trimmedContent || trimmedTitle.length > 100)
		return false;

	return true;
};

// utility function to create dom elements
export const createElement = ({
  tag,
  className,
  text,
  attrs = {},
  children = [],
  events = {},
}) => {
  const el = document.createElement(tag);

  // classes
  if (className) el.className = className;

  // text
  if (text) el.textContent = text;

  // attributes
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });

	// events
  Object.entries(events).forEach(([event, handler]) => {
    el.addEventListener(event, handler);
  });

  // children
  children.forEach((child) => {
    if (child) el.appendChild(child);
  });

  return el;
};
