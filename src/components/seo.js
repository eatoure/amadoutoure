import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';

/**
 * Unified SEO component using Gatsby Head API (no react-helmet).
 * Usage: export const Head = (props) => <Seo {...optionalProps} />
 */
const Seo = ({ title, description, image }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(graphql`
    query SeoSiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
          twitterUsername
        }
      }
    }
  `);

  const meta = site.siteMetadata;
  const seo = {
    title: title || meta.title,
    description: description || meta.description,
    image: `${meta.siteUrl}${image || meta.image}`,
    url: `${meta.siteUrl}${pathname}`,
  };

  return (
    <>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={meta.twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />
    </>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

Seo.defaultProps = {
  title: null,
  description: null,
  image: null,
};

export default Seo;
