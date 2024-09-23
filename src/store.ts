import { deepMap } from "nanostores";
import log from "./logs";

/**
 * type for an app. this is used when an app is created
 */
export type app = {
  title: string;
  content: any;
  icon?;
  width?;
  maxHeight?;
  index: number;
  source: string;
  layer: number;
};

/**
 * types for a template
 * used when creating a new template or as the basis for a new custom app
 */
export type appTemplate = Omit<app, "index" | "source" | "layer"> & {
  key: string;
};

type template = Omit<appTemplate, "key">;

/**
 * types used when making a new app
 */
export type newApp = (template | { template: string }) & { source: string };

export const openApps = deepMap<{
  latestIndex: number;
  latestLayer: number;
  apps: { [key: string]: app };
}>({
  latestIndex: -1,
  latestLayer: 1,
  apps: {},
});

export const templateApps = deepMap<{ [key: string]: template }>({});

/**
 * contains all functions for managing apps!
 */
export const apps = {
  ////////////////
  //    APP     //
  // MANAGEMENT //
  ////////////////

  /**
   * Create a new app from a template or from a custom value
   */
  set newApp(app: newApp) {
    log("creating new app", "purple", app.source);
    // app defaults
    let result: app = {
      index: this.newIndex,
      source: app.source,
      layer: this.newLayer,
      title: "",
      content: undefined,
    };
    // if it is loading a template
    if ("template" in app)
      // load the template and overwrite any defaults from result
      result = { ...result, ...this.getTemplate(app.template) };
    // otherwise load the arguments provided by the arguments
    else result = { ...result, ...app };

    // then set the
    openApps.setKey(`apps.${result.index}`, result);
  },

  /**
   * close an app based on id
   * @param id id of the app to close
   */
  closeApp(id: number) {
    log("closing", "red", openApps.get().apps[id].title);
    const newApps = Object.keys(openApps.get().apps).reduce((acc, key) => {
      if (parseInt(key) !== id) {
        acc[key] = openApps.get().apps[key];
      }
      return acc;
    }, {});
    openApps.set({ ...openApps.get(), apps: newApps });
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
  focusApp(id: number) {
    log(`focusing app ${id}`, "#008282", openApps.get().apps[id].title);
    openApps.setKey(`apps.${id}`, {
      ...openApps.get().apps[id],
      layer: this.newLayer,
    });
  },

  ///////////////
  // TEMPLATES //
  ///////////////

  /**
   * Create a new template app
   */
  set newTemplate(template: appTemplate) {
    log("creating new template", "green", template.title);
    templateApps.setKey(`${template.key}`, {
      title: template.title,
      content: template.content,
      icon: template.icon,
      width: template.width,
      maxHeight: template.maxHeight,
    });
  },

  /**
   * get a template from its name. returns an error app if it isnt found
   */
  getTemplate(template: string) {
    log("retriving template", "slateblue", template);
    // if the template doesnt exist
    if (!(template in templateApps.get())) {
      // inform the console
      log("template not found", "tomato", template, console.warn);
      // check if there are any templates
      if (Object.keys(templateApps.get()).length === 0)
        log("no templates defined", "tomato", console.warn);
      // return an error app
      return {
        title: "404",
        content: `the app ${template} doesnt seem to exist. please let me know if u think this shouldnt be happening!`,
      };
    }

    // the template exists: return that
    return templateApps.get()[template];
  },
};
