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

  const skills = ['Flutter', 'JavaScript', 'Figma', 'Epic', 'R Studio', 'Python', 'C++', 'Java'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Currently a senior at Carleton College, I am very interested in Computer Science and
              Software Engineering, and also have a deep interest in medicine. Majoring in Computer
              Science with a minor in Biochemistry, I bring forth a solid academic foundation and
              intermediate technical proficiency. My deep-rooted interest in medicine stems from
              first-hand experiences with the shortcomings of Sénégal’s healthcare system. My
              mission is to leverage technology to improve people's daily lives. From designing
              applications to facilitate the integration of non-English speakers to conducting
              in-depth analysis of Senegal's healthcare system, my work is aimed at creating
              sustainable solutions for societal betterment. With a passion for leadership and
              active involvement, I am committed to the journey of driving transformative change.
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of interning and working at various
              prestigious institutions and organizations, contributing to diverse areas of
              healthcare, software engineering, machine learning, and research. I’ve worked at{' '}
              <a href="https://www.mayo.edu/research/departments-divisions/department-otorhinolaryngology/education-training/undergraduate-research-program">
                the Mayo Clinic
              </a>
              , and a
              <a href="https://www.carleton.edu/perception-lab/">
                {' '}
                Psych. Research Lab at Carleton
              </a>
              . I am also a member of <a href="https://www.thrivescholars.org">Thrive Scholars</a>,
              a non-profit organization aimed at supporting underrepresented minorities, and
              coordinate activities between{' '}
              <a href="https://healthfindersmn.org/about/">HealthFinders Collaborative</a>, a
              community health center dedicated to providing care for underserved and uninsured
              families, and Carleton College.
            </p>

            <p>
              Currently, one of my main focuses is to obtain my Bachelor of Arts degree in Computer
              Science and Biochemistry to hopefully start a SWE position upon graduation.
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
