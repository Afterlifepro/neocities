import { deepMap } from 'nanostores';

/**
 * @typedef {Object} App
 * @property {string} title
 * @property {any} content
 */

/** @type {import('nanostores').DeepMapStore<Record<string, App>>} */
export const openApps = deepMap({
    length: 0,
    apps: [],
});

/** @type {import('nanostores').DeepMapStore<Record<string, App>>} */
const templateApps = deepMap({
    length: 0,
    apps: []
});

export const apps = {
    set newApp({ title, content }) {
        openApps.setKey("apps[" + this.newIndex + "]", { title: title, content: content })
    },
    set newTemplate({ title, content }) {
        templateApps.get().length += 1
        templateApps.setKey(`apps[${templateApps.get().length}]`, { title: title, content: content })
    },
    get newIndex() {
        openApps.get().length += 1;
        return openApps.get().length
    }
}