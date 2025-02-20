import { useCallback, useEffect, createRef } from 'react';
import { FaWikipediaW } from 'react-icons/fa';
import { VscHistory } from 'react-icons/vsc';
import { BsInfo } from 'react-icons/bs';
import { IoClose, IoShuffle } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { ArticleSearch } from './ArticleSearch';

const iconColor = '#c9d1d9';
const closeIconSize = '1.4em';

export const Menu = ({ 
  openMenuSections, 
  setOpenMenuSections, 
  currentArticleName, 
  articleHistory,
  toggleGameMode,
  gameModeIsOn,
  updateGuess,
  showAnswer,
  guessIsCorrect,
  getRandomArticle,
  setArticleHistory,
}) => {
  const articleHistoryRef = createRef();

  useEffect(() => {
    if (
      openMenuSections.includes(1) && 
      articleHistory.length > 1 && 
      articleHistoryRef.current
    ) {
      setTimeout(() => articleHistoryRef.current.scrollIntoView({ behavior: "smooth" }), 1);
    }
  // Suppress warning about articleHistoryRef being a dependency; need to 
  // update it but not track every change to it
  // eslint-disable-next-line
  }, [openMenuSections, articleHistory.length]);

  const openMenuSection = useCallback((index) => {
    if (!openMenuSections.includes(index)) {
      setOpenMenuSections([...openMenuSections, index]);
    }
  }, [openMenuSections, setOpenMenuSections]);

  const closeMenuSection = useCallback((index) => {
    if (openMenuSections.includes(index)) {
      setOpenMenuSections(openMenuSections.filter((i) => i !== index));
    }
  }, [openMenuSections, setOpenMenuSections]);

  return (
    <div className="menu">
        <div className="menu-section" onClick={() => getRandomArticle()}>
          <IconContext.Provider value={{ color: iconColor, size: '1.4em' }}>
            <div style={{ display: 'flex', justifyItems: 'center' }}><IoShuffle /></div>
          </IconContext.Provider>
        </div>

      <div
        className={'menu-section' + (openMenuSections.includes(0) ? '-is-open' : '')}
        onClick={() => openMenuSection(0)}
      >
        {openMenuSections.includes(0) 
          ? <>
              <div className="close-icon-container" onClick={() => closeMenuSection(0)}>
                <IconContext.Provider value={{ color: iconColor, size: closeIconSize }}>
                  <div style={{ display: 'flex', justifyItems: 'center' }}><IoClose /></div>
                </IconContext.Provider>
              </div>
              <ArticleSearch
                chosenArticleTitle={currentArticleName || ''}
                gameModeIsOn={gameModeIsOn}
                updateGuess={updateGuess}
                setArticleHistory={setArticleHistory}
              />
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: gameModeIsOn && !guessIsCorrect ? 12 : 0 }}>
                <button
                  className="control-button"
                  onClick={() => {
                    getRandomArticle();
                  }}
                >
                  {gameModeIsOn ? 'New round' : 'Random article'}
                </button>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <p className="text">Game mode:</p>
                  <input className="toggle" type="checkbox" checked={gameModeIsOn} onChange={(e) => toggleGameMode(e.target.checked)}/>
                </div>
              </div>
              {gameModeIsOn && !guessIsCorrect &&
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <button
                    className="control-button"
                    onClick={() => showAnswer()}
                  >
                    {'Show answer'}
                  </button>
                </div>
              }
            </>
          : <IconContext.Provider value={{ color: iconColor, size: '1.3em' }}>
              <div style={{ display: 'flex', justifyItems: 'center' }}><FaWikipediaW /></div>
            </IconContext.Provider>
        }
      </div>

      <div
        className={
          `menu-section${
            openMenuSections.includes(1) ? '-is-open' : ''
          } article-history`}
        onClick={() => openMenuSection(1)}
      >
        {openMenuSections.includes(1)
          ? <>
              <div className="close-icon-container" onClick={() => closeMenuSection(1)}>
                <IconContext.Provider value={{ color: iconColor, size: closeIconSize }}>
                  <div><IoClose /></div>
                </IconContext.Provider>
              </div>
              <p className="text history">{gameModeIsOn ? 'Guesses this round' : 'Article history'}</p>
              <div 
                className={`history-container ${
                  openMenuSections.includes(2) ? 'compact' : ''
                }`}
              >
                {articleHistory.map((a, index) => {
                  return (
                    <p className='history-card' key={`${a}-${index}`}>{a.replaceAll("_", " ")}</p>
                  );
                })}
                <div ref={articleHistoryRef}></div>
              </div>
            </>
          : <IconContext.Provider value={{ color: iconColor, size: '1.25em' }}>
              <div style={{ display: 'flex', justifyItems: 'center' }}><VscHistory /></div>
            </IconContext.Provider>
        }
      </div>

      <div
        className={'menu-section' + (openMenuSections.includes(2) ? '-is-open' : '')}
        onClick={() => openMenuSection(2)}
      >
        {openMenuSections.includes(2)
          ? <>
              <div className="close-icon-container" onClick={() => closeMenuSection(2)}>
                <IconContext.Provider value={{ color: iconColor, size: closeIconSize }}>
                  <div><IoClose /></div>
                </IconContext.Provider>
              </div>
              <p className="text">
                <b>Controls</b><br /><br />
                Drag to rotate<br />
                Pinch or scroll to zoom<br />
                Click center article to visit it<br />
                Click other articles to center them<br /><br />

                <b>What everything means</b><br /><br />
                Two articles being connected means<br />
                people frequently go from one to the<br />
                other when browsing Wikipedia (and the<br />
                moving particles tell you the direction).<br />
                This data comes from&nbsp;
                <a 
                  href='https://wikinav.toolforge.org/' 
                  target='_blank' 
                  rel="noreferrer"
                  style={{ color: 'rgb(56,139,253)', textDecoration: 'none' }}
                >
                  WikiNav
                </a>. In game<br />mode, you try to guess the center article.<br /><br /> See & support the Wikijumps source code&nbsp;
                <a
                  href="https://github.com/tylerb1/wikjumps"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'rgb(56,139,253)', textDecoration: 'none' }}
                >
                  here.
                </a>
              </p>
            </>
          : <IconContext.Provider value={{ color: iconColor, size: '1.75em' }}>
              <div style={{ display: 'flex', justifyItems: 'center' }}><BsInfo /></div>
            </IconContext.Provider>
        }
      </div>
    </div>
  );
};
