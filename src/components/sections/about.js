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
    'SQL',
    'Scikit-learn',
    'XGBoost',
    'R',
    'Unsupervised Learning',
    'Time-Series Forecasting',
    'Teradata',
    'Docker',
    'React',
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
              Biochemistry. Today, I work full-time as a Data Scientist II at{' '}
              <a href="https://www.baltimorehealthanalytics.com">Baltimore Health Analytics</a>,
              where I build machine learning models and data pipelines, including R&amp;D on a model
              that predicts CMS Medicare Advantage Star ratings. I joined BHA as a Data Science
              Intern in March 2025.
            </p>

            <p>
              My work centers on AI and machine learning: predictive modeling, unsupervised
              learning, and the data engineering that makes models useful in practice. I’m
              especially drawn to computer vision and recognition, teaching machines to make sense
              of images, speech, and other signals people interpret without thinking.
            </p>

            <p>
              Beyond Baltimore Health Analytics, I&apos;m building{' '}
              <a href="https://www.azertica.com">Azertica</a>, a startup developing cloud-based
              tools in healthcare, education, connectivity, and sports to strengthen Africa&apos;s
              digital infrastructure. Whether I&apos;m architecting ML pipelines or shipping product
              features, my mission remains the same: deliver technology that improves access,
              clarity, and real-world decision-making.
            </p>

            <p>
              Before BHA, I applied clustering to cardiometabolic survey data at{' '}
              <a href="https://www.brighamandwomens.org/medicine/infectious-disease/bridge-summer-fellowship">
                Harvard Medical School / Mass General Brigham
              </a>
              , modeled spoken-word recognition in noise at the{' '}
              <a href="https://www.carleton.edu/perception-lab/">Carleton College Perception Lab</a>
              , and built <a href="https://myelomarisk.com">myelomarisk.com</a>, a prognosis
              prediction tool, at Mayo Clinic. I’m also a founding member and lead developer for
              JammSanté, a technology initiative under{' '}
              <a href="https://www.azertica.com">Azertica</a>.
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
