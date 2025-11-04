import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAwardsSection = styled.section`
  max-width: 900px;
  margin: 0 auto;

  .awards-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 40px 0 0;
  }

  .award-card {
    position: relative;
    padding: 24px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
    transition: var(--transition);

    &:hover,
    &:focus-within {
      transform: translateY(-6px);
    }
  }

  .award-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
  }

  .award-meta {
    margin: 0;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const awards = [
  {
    name: 'David John Field Prize',
    context: 'Carleton College',
  },
  {
    name: 'David Pollatsek ’96 Prize in Computer Science',
    context: 'Carleton College',
  },
  {
    name: 'Carleton College Impact Challenge Pitch for Startups',
    context: '2nd Place · $5,000 Cash Prize',
  },
  {
    name: 'Roy F. Grow Fellowship',
    context: 'Significant Student Experience in Asia',
  },
  {
    name: 'QuestBridge National College Match Scholar',
    context: 'QuestBridge',
  },
];

const Awards = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAwardsSection id="awards" ref={revealContainer}>
      <h2 className="numbered-heading">Awards & Honors</h2>

      <ul className="awards-list">
        {awards.map(({ name, context }, index) => (
          <li key={index} className="award-card">
            <h3 className="award-title">{name}</h3>
            <p className="award-meta">{context}</p>
          </li>
        ))}
      </ul>
    </StyledAwardsSection>
  );
};

export default Awards;
