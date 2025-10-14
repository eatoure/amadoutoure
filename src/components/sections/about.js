import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Python',
    'Flask',
    'React',
    'SQL',
    'Snowflake',
    'Apache ECharts',
    'Time-Series Forecasting',
    'Docker',
    'XGBoost',
    'SARIMAX',
    'Exponential Smoothing',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I’m a proud Carleton College alum with a B.A. in Computer Science and a minor in
              Biochemistry, now working as a Data Scientist at{' '}
              <a href="https://www.baltimorehealthanalytics.com">Baltimore Health Analytics</a>.
              Each day I design predictive modeling systems and full-stack analytics platforms that
              help healthcare leaders make faster, better-informed decisions.
            </p>

            <p>
              My passion for this work is rooted in firsthand exposure to the challenges of
              Sénégal’s healthcare system and my general insterest in healthcare. That perspective
              keeps me focused on building accessible tools that translate complex data into
              meaningful care. I’ve previously contributed to research and engineering teams at{' '}
              <a href="https://www.mayo.edu/research/departments-divisions/department-otorhinolaryngology/education-training/undergraduate-research-program">
                Mayo Clinic
              </a>
              , the <a href="https://www.carleton.edu/perception-lab/">Carleton Perception Lab</a>,
              and community-focused organizations like{' '}
              <a href="https://healthfindersmn.org/about/">HealthFinders Collaborative</a>.
            </p>

            <p>
              Beyond Baltimore Health Analytics, I'm building{' '}
              <a href="https://www.azertica.com">Azertica</a>, a startup developing cloud based SaaS
              tools in healthcare, education, connectivity, and sports to strengthen Africa's
              digital infrastructure. Simlulaneously, I engage with DeeboAI, a startup focused on
              SaaS, specifically DAW plugin development, and app and website consulting. Whether I'm
              architecting scalable ML pipelines, reworking front-end UX, or parterning with
              clinicians and creators, my mission remains the same: deliver technology that elevates
              health outcomes, enhances accessibility, and amplified creative expression across a
              wide array of domains.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
