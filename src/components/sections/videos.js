import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledVideosGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledVideo = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: flex-start;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .video-content {
      grid-column: 1 / 6;
      grid-row: 1;
      text-align: left;

      @media (max-width: 1080px) {
        grid-column: 1 / 7;
      }
      @media (max-width: 768px) {
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .video-tech-list {
      justify-content: flex-start;

      li {
        margin: 0 20px 5px 0;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .video-links {
      justify-content: flex-start;
      margin-left: -10px;
      margin-right: 0;
    }
    .video-player {
      grid-column: 7 / -1;
      grid-row: 1;

      @media (max-width: 768px) {
        margin-bottom: 20px;
      }
    }
  }

  &:nth-of-type(even) {
    .video-content {
      grid-column: 8 / -1;
      grid-row: 1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 7 / -1;
      }
      @media (max-width: 768px) {
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .video-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .video-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .video-player {
      grid-column: 1 / 7;
      grid-row: 1;

      @media (max-width: 768px) {
        margin-bottom: 20px;
      }
    }
  }

  .video-content {
    position: relative;

    @media (max-width: 768px) {
      display: block;
      padding: 40px 40px 30px;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .video-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .video-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .video-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .video-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }
  }

  .video-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .video-player {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;

    iframe {
      width: 100%;
      height: 100%;
      aspect-ratio: 16 / 9;
      border: 0;
      border-radius: var(--border-radius);
      vertical-align: middle;
    }
  }
`;

const Videos = () => {
  const data = useStaticQuery(graphql`
    query {
      videos: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/videos/" }
          frontmatter: { title: { ne: null } }
        }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              videoId
              tags
            }
            html
          }
        }
      }
    }
  `);

  const videosData = data.videos.edges;
  const revealTitle = useRef(null);
  const revealVideos = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealVideos.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="videos">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Videos I've Made
      </h2>

      <StyledVideosGrid>
        {videosData &&
          videosData.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { videoId, title, tags } = frontmatter;
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

            return (
              <StyledVideo key={i} ref={el => (revealVideos.current[i] = el)}>
                <div className="video-content">
                  <div>
                    <p className="video-overline">Video</p>

                    <h3 className="video-title">
                      <a href={youtubeUrl} target="_blank" rel="noreferrer">
                        {title}
                      </a>
                    </h3>

                    <div className="video-description" dangerouslySetInnerHTML={{ __html: html }} />

                    {tags && tags.length && (
                      <ul className="video-tech-list">
                        {tags.map((tag, j) => (
                          <li key={j}>{tag}</li>
                        ))}
                      </ul>
                    )}

                    <div className="video-links">
                      <a
                        href={youtubeUrl}
                        aria-label="YouTube Link"
                        target="_blank"
                        rel="noreferrer"
                        className="external">
                        <Icon name="External" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="video-player">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </StyledVideo>
            );
          })}
      </StyledVideosGrid>
    </section>
  );
};

export default Videos;
