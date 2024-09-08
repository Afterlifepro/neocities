import { deepMap } from "nanostores";

export const openApps = deepMap<any>({
  latestIndex: -1,
  latestLayer: 1,
  apps: {},
});

const templateApps = deepMap<any>({});
/**
 * contains all functions for managing apps!
 */
export const apps = {
  /**
   * Create a new app from a template or from a custom value
   * == props for all variants ==
   * @param {string} source the source of the app. this is used to debug
   *
   * == props for template variant ==
   * @param {string} template the name of the template to use
   *
   * == props for custom variant ==
   * @param {string} title the title of the window
   * @param {any} content the content rendered in the app
   */
  set newApp(app: { title; content; icon?, source } | { template; source }) {
    let result: { [key: string]: any } = {
      index: this.newIndex,
      source: app.source,
      layer: this.newLayer,
    };
    if ("template" in app) {
      const template = this.getTemplate(app.template);
      result = { ...template, ...result };
    } else {
      result = { ...app, ...result };
    }
    openApps.setKey(`apps[${result.index}]`, result);
  },
  /**
   * close an app based on id
   * @param id id of the app to close
   */
  closeApp(id) {
    const newApps = Object.keys(openApps.get().apps).reduce((acc, key) => {
      if (key !== id) {
        acc[key] = openApps.get().apps[key];
      }
      return acc;
    }, {});
    openApps.set({ ...openApps.get(), apps: newApps });
  },
  /**
   * Create a new template app
   * @param {string} title the name of the app
   * @param {any} content the content of the app
   */
  set newTemplate(template: { title; content; icon?; key }) {
    templateApps.setKey(`${template.key}`, {
      title: template.title,
      content: template.content,
      icon: template.icon
    });
  },
  /**
   * get a template from its name. returns an error app if it isnt found
   * @param template name of the template to obtain
   * @returns the template object
   */
  getTemplate(template: string) {
    if (!(template in templateApps.get()))
      return {
        title: "404",
        content: `the app ${template} doesnt seem to exist. please let me know if u think this shouldnt be happening!`,
      };
    return templateApps.get()[template];
  },
  /**
   * gets the next app index. this is to ensure there are no duplicate id's and each one is unique and consistent
   */
  get newIndex() {
    openApps.get().latestIndex += 1;
    return openApps.get().latestIndex;
  },
  /**
   * get the next layer for windows
   */
  get newLayer() {
    openApps.get().latestLayer += 1;
    return openApps.get().latestLayer;
  },
  /**
   * focuses an app based on id
   * @param id id of the app to focus
   */
  focusApp(id) {
    openApps.setKey(`apps[${id}]`, {
      ...openApps.get().apps[id],
      layer: this.newLayer,
    });
  },
};
