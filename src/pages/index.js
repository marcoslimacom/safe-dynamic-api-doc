import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "Easy to Use",
    imageUrl: "img/logo.svg",
    description: (
      <>
        Automatically generate APIs with your own authentication or via
        facebook, google, github, bitbucket or linkedin with customized roles
        and permissions from MySQL/MariaDB, PostgreSQL, SQL Server or SQLite
        databases with source code.
      </>
    ),
  },
  {
    title: <>Support</>,
    imageUrl: "img/support.png",
    description: (
      <>
        Always ready to serve you quickly and efficiently, any questions you
        consider important and let us know. Access this{" "}
        <a href="https://marcoslima.com/support">link</a>.
      </>
    ),
  },
  {
    title: <>Marcos Lima</>,
    imageUrl: "img/logo-marcoslima.png",
    imageAlt: "Marcos Lima",
    description: (
      <>
        Discover other products and personalized services with high quality and
        with the deadline that your company needs. Access this{" "}
        <a href="https://marcoslima.com">link</a>.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Automatically generate APIs with your own authentication or via facebook, google, github, bitbucket or linkedin with customized roles and permissions from MySQL/MariaDB, PostgreSQL, SQL Server or SQLite databases with source code."
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
