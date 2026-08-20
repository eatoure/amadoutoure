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
    'Teradata',
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
          {/* Use the about section to add fuller context without changing the homepage structure. */}
          <div>
            <p>
              I’m a proud Carleton College alum with a B.A. in Computer Science and a minor in
              Biochemistry. Today, I work full-time as a Data Scientist at{' '}
              <a href="https://www.baltimorehealthanalytics.com">Baltimore Health Analytics</a>,
              where I build healthcare analytics tools and predictive systems for Medicare Advantage
              STAR ratings.
            </p>

            <p>
              I’m a data scientist and software builder working across healthcare analytics, AI
              systems, education technology, and tutoring infrastructure. My work sits at the
              intersection of software engineering, clinical research, data science, and practical
              operations design, with an emphasis on tools people actually use.
            </p>

            <p>
              Beyond Baltimore Health Analytics, I&apos;m building{' '}
              <a href="https://www.azertica.com">Azertica</a>, a startup developing cloud-based
              tools in healthcare, education, connectivity, and sports to strengthen Africa&apos;s
              digital infrastructure. Simultaneously, I&apos;m building{' '}
              <a href="https://www.deeboai.com">Deebo</a>, a software and AI consulting venture
              focused on practical digital systems, workflow automation, education technology, and
              small-business infrastructure. Whether I&apos;m architecting scalable ML pipelines,
              reworking front-end UX, or building tools for healthcare, education, and
              small-business operations, my mission remains the same: deliver technology that
              improves access, clarity, and real-world decision-making.
            </p>

            <p>
              My passion for this work is rooted in firsthand exposure to the challenges of
              Sénégal’s healthcare system and my longstanding interest in medicine and education.
              That perspective keeps me focused on building accessible systems that translate
              complex information into useful action. I’ve previously contributed to research and
              engineering teams at{' '}
              <a href="https://myelomarisk.com">Mayo Clinic, where I built myelomarisk.com, </a>
              <a href="https://www.brighamandwomens.org/medicine/infectious-disease/bridge-summer-fellowship">
                Harvard Medical School / Mass General Brigham
              </a>
              , the{' '}
              <a href="https://www.carleton.edu/perception-lab/">Carleton College Perception Lab</a>
              . I’m also a founding member and lead developer for JammSanté, a health-focused
              technology initiative under <a href="https://www.azertica.com">Azertica</a>.
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
