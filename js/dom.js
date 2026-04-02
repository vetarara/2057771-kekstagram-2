/**
 * Should contain only one child element
 * @param {string} id
 */

const findTemplate = (id) => {
  const template = document.getElementById(id);

  if (!template) {
    throw new Error(`Template not found: ${id}`);
  }

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not a template: ${id}`);
  }

  return template.content.firstElementChild;
};

export { findTemplate };
