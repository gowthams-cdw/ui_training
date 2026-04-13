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
