const get = require("lodash/get");

const includesAny = require("../util/includesAny");

module.exports = [
  {
    name: "dependency",
    aka: ["updateable"],
    description:
      "Rather than copying the project, you add it as a dependency. This makes updates a lot easier and keeps your project cleaner.",
  },
  {
    name: "gatsby",
    description:
      "Gatsby is a static site generator. These starters are static sites built with Gatsby.",
    match: project => includesAny(project.dependencies, ["gatsby"]),
  },
  {
    name: "babel",
    description: "Babel transpiles JavaScript.",
    match: project =>
      includesAny(project.dependencies, ["babel", "babel-core"]),
  },
  {
    name: "coffeescript",
    aka: ["coffee", "coffee script"],
    description: "CoffeeScript is a language that compiles into JavaScript",
    match: project =>
      includesAny(project.dependencies, ["coffee-loader", "coffee-script"]),
  },
  {
    name: "css modules",
    aka: ["css-modules"],
    description:
      "A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.",
    match: project => {
      if (
        includesAny(project.dependencies, [
          "css-modules-require-hook",
          "css-modules",
        ])
      ) {
        return true;
      }

      // NOTE: CSS modules can be used without a CSS module package.
      // Add the tag manually if necessary.

      return false;
    },
  },
  {
    name: "redux",
    description: "Redux is used for state management.",
    match: project => includesAny(project.dependencies, ["redux"]),
  },
  {
    name: "flux",
    description: "Flux is used for state management.",
    match: project => includesAny(project.dependencies, ["flux"]),
  },
  {
    name: "mobx",
    description: "Mobx is used for state management.",
    match: project => includesAny(project.dependencies, ["mobx"]),
  },
  {
    name: "hmr",
    aka: ["hot", "hot module reloading"],
    description:
      "Supports updating JavaScript in the browser without a refresh.",
    match: project => {
      // 'react-boilerplate' supports HMR by specifying '--hot' in the start script
      // https://github.com/rbartoli/react-boilerplate
      const startScript = get(project, "packageJson.scripts.start", "");
      if (startScript.includes("--hot")) {
        return true;
      }

      return includesAny(project.dependencies, [
        "react-hot-loader",
        "react-transform-hmr",
        "webpack-hot-middleware",
        "livereactload", // hot reload for browserify
      ]);
    },
  },
  {
    name: "inline style",
    aka: ["inline CSS"],
    description:
      "CSS is added with inline style properties rather than in a separate stylesheet.",
    match: project => includesAny(project.dependencies, ["react-inline-css"]),
  },
  {
    name: "linter",
    aka: ["lint"],
    description:
      "Linters are used to catch errors and coding style issues early.",
    match: project =>
      includesAny(project.dependencies, [
        "eslint",
        "jshint",
        "jscs",
        "eslint-plugin-react",
        "gulp-eslint",
        "babel-eslint",
        "tslint",
      ]),
  },
  {
    name: "live reload",
    aka: ["auto reload", "browser reload"],
    description:
      "Automatic browser refresh whenever the developer makes code changes in the text editor.",
    match: project =>
      includesAny(project.dependencies, ["BrowserSync", "piping"]),
  },
  {
    name: "minimal",
    aka: ["simple"],
    description:
      "A project is considered 'minimal' if it has fewer than 20 dependencies.",
    match: project => project.dependencies.length < 20,
  },
  {
    name: "rails",
    match: project => project.dependencies.includes("react-rails"),
  },
  {
    name: "native",
    match: project => project.dependencies.includes("react-native"),
  },
  {
    name: "router",
    aka: ["routing"],
    description: "Uses react-router to keep the UI in sync with the URL.",
    match: project => project.dependencies.includes("react-router"),
  },
  {
    name: "tests",
    aka: ["test", "unit test"],
    description: "The project has same framework set up for testing.",
    match: project =>
      includesAny(project.dependencies, [
        "jest",
        "jest-cli",
        "mocha",
        "jasmine",
        "karma",
      ]),
  },
  {
    name: "typescript",
    description:
      "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
    match: project => project.dependencies.includes("typescript"),
  },
  {
    name: "universal",
    aka: ["isomorphic"],
    description:
      "Runs on both the client and the server, usually with Express or Koa.",
    match: project => {
      // I used to check for express, koa, and hapi. Then I realized that just
      // having a server doesn't make the project universal/isomorphic.
      //
      // Now I check the project name and description for 'universal' or 'isomorphic'.
      const description = get(project, "description") || "";
      return (
        project.githubPath.match(/isomorphic/i) ||
        project.githubPath.match(/universal/i) ||
        description.match(/isomorphic/i) ||
        description.match(/universal/i)
      );
    },
  },
  {
    name: "webpack 3",
    aka: ["webpack3"],
    description: "Webpack 3 was released in June 2017.",
    match: project => {
      const dependencies = Object.assign(
        {},
        project.packageJson.dependencies,
        project.packageJson.devDependencies
      );
      const webpackVersionRange = dependencies.webpack;
      if (!webpackVersionRange) {
        return false;
      }
      // Get the first digit
      const webpackMajorVersion = webpackVersionRange.match(/[0-9]/)[0];
      if (!webpackMajorVersion) {
        return false;
      }
      return webpackMajorVersion === "3";
    },
  },
  {
    name: "webpack 4",
    aka: ["webpack4"],
    description: "Webpack 4 was released in Feb 2018.",
    match: project => {
      const dependencies = Object.assign(
        {},
        project.packageJson.dependencies,
        project.packageJson.devDependencies
      );
      const webpackVersionRange = dependencies.webpack;
      if (!webpackVersionRange) {
        return false;
      }
      // Get the first digit
      const webpackMajorVersion = webpackVersionRange.match(/[0-9]/)[0];
      if (!webpackMajorVersion) {
        return false;
      }
      return webpackMajorVersion === "4";
    },
  },
  {
    name: "flow",
    aka: ["flowtype"],
    description: "Static type checker by Facebook",
    match: project => includesAny(project.dependencies, ["babel-preset-flow"]),
  },
  {
    name: "parcel-bundler",
    aka: ["parcel"],
    description: "Blazing fast, zero configuration web application bundler",
    match: project => includesAny(project.dependencies, ["parcel-bundler"]),
  },
  {
    name: "electron",
    description: "Tool for building desktop apps.",
    match: project =>
      includesAny(project.dependencies, [
        "electron-packager",
        "electron",
        "electron-rebuild",
      ]),
  },
];
