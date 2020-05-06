const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: "css",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#008C00',
        '@layout-header-background': '#003F10',
        '@menu-dark-submenu-bg': '#001704',
        '@layout-trigger-background': '#174e1b'
      },
    },
  }),
);