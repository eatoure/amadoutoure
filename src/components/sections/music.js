// src/components/sections/Music.js

import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import WaveSurfer from 'wavesurfer.js';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledMusicSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    @media (min-width: 700px) {
      min-height: 400px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .artist {
      color: var(--green);
    }
  }

  .album {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .description {
    margin-top: 20px;
  }
`;

const StyledWaveformContainer = styled.div`
  margin-top: 20px;
`;

const StyledControls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  .play-button {
    background-color: #1db954;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #1ed760;
    }
  }

  .time {
    margin-left: 20px;
    font-size: var(--fz-sm);
    color: var(--light-slate);
    font-family: var(--font-mono);
  }

  .volume-control {
    margin-left: auto;
    display: flex;
    align-items: center;

    input[type='range'] {
      margin-left: 10px;
    }
  }
`;

const Music = () => {
  const data = useStaticQuery(graphql`
    query {
      music: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/music/" } }
        sort: { frontmatter: { year: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              artist
              album
              year
              url
            }
            html
          }
        }
      }
    }
  `);

  const musicData = data.music.edges;
  const [activeTabId, setActiveTabId] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [volume, setVolume] = useState(1);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Reset play state when current track finishes
  function handleFinish() {
    setIsPlaying(false);
    setCurrentTime(formatTime(0));
    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(0);
    }
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const formatTime = seconds => {
    if (isNaN(seconds)) {
      return '0:00';
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  // Initialize WaveSurfer instance when activeTabId changes
  useEffect(() => {
    // Clean up previous instance
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }

    setIsReady(false);
    setCurrentTime('0:00');
    setDuration('0:00');
    setIsPlaying(false);

    const currentTrack = musicData[activeTabId].node.frontmatter;

    if (waveformRef.current && currentTrack.url) {
      // Create new WaveSurfer instance
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ddd',
        progressColor: '#1DB954',
        height: 80,
        responsive: true,
        barWidth: 2,
        barGap: 2,
        cursorColor: '#1DB954',
        backend: 'MediaElement',
      });

      wavesurferRef.current.load(currentTrack.url);

      wavesurferRef.current.on('ready', () => {
        setDuration(formatTime(wavesurferRef.current.getDuration()));
        setIsReady(true);
        wavesurferRef.current.setVolume(volume);
      });

      wavesurferRef.current.on('audioprocess', () => {
        if (wavesurferRef.current.isPlaying()) {
          setCurrentTime(formatTime(wavesurferRef.current.getCurrentTime()));
        }
      });

      wavesurferRef.current.on('finish', handleFinish);
    }

    // Cleanup on unmount
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [activeTabId]);

  const handlePlayPause = () => {
    if (wavesurferRef.current && isReady) {
      if (isPlaying) {
        wavesurferRef.current.pause();
        setIsPlaying(false);
      } else {
        wavesurferRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = e => {
    const newVolume = +e.target.value;
    setVolume(newVolume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
    }
  };

  const onKeyDown = e => {
    const { key } = e;
    let newTabId = activeTabId;

    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      e.preventDefault();
      newTabId = (activeTabId - 1 + musicData.length) % musicData.length;
    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
      e.preventDefault();
      newTabId = (activeTabId + 1) % musicData.length;
    }

    setActiveTabId(newTabId);
    tabs.current[newTabId].focus();
  };

  return (
    <StyledMusicSection id="music" ref={revealContainer}>
      <h2 className="numbered-heading">Some Hobbies: My Music (I recommend headphones!)</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Music tabs" onKeyDown={onKeyDown}>
          {musicData &&
            musicData.map(({ node }, i) => {
              const { title } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i}
                  aria-controls={`panel-${i}`}
                >
                  <span>{title}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {musicData &&
            musicData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, artist, album, year } = frontmatter;

              return (
                <CSSTransition
                  key={i}
                  in={activeTabId === i}
                  timeout={250}
                  classNames="fade"
                  unmountOnExit
                >
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}
                  >
                    <h3>
                      <span>{title}</span>
                      <span className="artist">
                        &nbsp;by&nbsp;
                        <span className="inline-link">{artist}</span>
                      </span>
                    </h3>
                    <p className="album">
                      Album: {album} ({year})
                    </p>
                    <div>
                      <StyledWaveformContainer>
                        <div ref={waveformRef} />
                      </StyledWaveformContainer>
                      <StyledControls>
                        <button
                          className="play-button"
                          onClick={handlePlayPause}
                          disabled={!isReady}
                          title={!isReady ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? '❚❚' : '▶'}
                        </button>
                        <div className="time">
                          {currentTime} / {duration}
                        </div>
                        <div className="volume-control">
                          <span>Volume</span>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                          />
                        </div>
                      </StyledControls>
                    </div>
                    <div className="description" dangerouslySetInnerHTML={{ __html: html }} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledMusicSection>
  );
};

export default Music;
