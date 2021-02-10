module.exports = {
  title: "SafeDynamicAPI Documentation",
  tagline:
    "Automatically generate APIs with your own authentication or via facebook, google, github, bitbucket or linkedin with customized roles and permissions from MySQL/MariaDB, PostgreSQL, SQL Server or SQLite databases with source code.",
  url: "https://safe-dynamic-api-doc.vercel.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "marcoslimacom", // Usually your GitHub org/user name.
  projectName: "safe-dynamic-api-doc", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "SafeDynamicAPI",
      logo: {
        alt: "SafeDynamicAPI",
        src: "img/logo.png",
      },
      items: [
        {
          to: "docs",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "docs/change-logs", label: "Change logs", position: "left" },
        {
          href: "https://pay.hotmart.com/N47508603N?checkoutMode=10",
          label: "Buy",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/",
            },
            {
              label: "Source code",
              to: "docs/documentation/source-code",
            },
            {
              label: "Use of dynamic APIs",
              to: "docs/documentation/apis",
            },
            {
              label: "Configuration of the main features",
              to: "docs/documentation/config-main-features",
            },
            {
              label: "Permissions Setting",
              to: "docs/documentation/permissions-setting",
            },
          ],
        },
        {
          title: "Support",
          items: [
            {
              label: "Contact Me",
              href: "https://www.marcoslima.com/contact",
            },
            {
              label: "Support",
              href: "https://www.marcoslima.com/support",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Demo frontend app",
              to: "https://safe-dynamic-api-demo-frontend.vercel.app",
            },
            {
              label: "Demo frontend app source code",
              to:
                "https://github.com/marcoslimacom/safe-dynamic-api-demo-frontend",
            },
            {
              label: "Demo backend app",
              href: "https://safe-dynamic-api-demo.dreamhosters.com/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SafeDynamicAPI`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/marcoslimacom/safe-dynamic-api-doc/edit/master/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/marcoslimacom/safe-dynamic-api-doc/edit/master/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
