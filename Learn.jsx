import React, { useMemo, useState } from 'react';
import BIG_QUESTIONS from './nasaBigQuestions.js';
import OTHER_SECTIONS from './nasaOtherSections.js';

const TOPIC_IMAGES = {
  'climate-change-meaning': 'https://climatekids.nasa.gov/resources/icons/climate-change-meaning.png',
  'carbon': 'https://climatekids.nasa.gov/resources/icons/carbon.jpg',
  'greenhouse-effect': 'https://climatekids.nasa.gov/resources/icons/greenhouse-effect.png',
  'climate-change-evidence': 'https://climatekids.nasa.gov/resources/icons/climate-change-evidence.jpg',
  'ocean': 'https://climatekids.nasa.gov/resources/icons/ocean.png',
  'weather-and-climate': 'https://climatekids.nasa.gov/resources/icons/weather-climate.jpg',
  'atmosphere': 'https://climatekids.nasa.gov/resources/icons/whats-in-the-atmosphere.jpg',
  'water': 'https://climatekids.nasa.gov/resources/icons/sea-level.png',
  'energy': 'https://climatekids.nasa.gov/resources/icons/air-pollution.jpg',
  'plants-and-animals': 'https://climatekids.nasa.gov/resources/icons/tree-rings.png'
};

export default function Learn(){
  const [openSlug, setOpenSlug] = useState(null);
  const current = useMemo(()=> ([...BIG_QUESTIONS, ...OTHER_SECTIONS].find(a=>a.slug===openSlug)||null), [openSlug]);

  return (
    <section className="section">
      <div className="container">
        <span className="badge">📘 Learn</span>
        <h1 className="h1 mt-6">Standards‑aligned learning</h1>
        <p className="lead">Ready‑to‑teach, bite‑sized lessons crafted with educators. Pair with quizzes to reinforce outcomes.</p>

        {!current && (
          <div className="mt-16">
            <div className="small">Explore</div>
            <h2 className="mt-6">NASA Climate Kids — Big Questions</h2>
            <div className="row grid-3 mt-16">
              {BIG_QUESTIONS.map(item => (
                <button key={item.slug} className="card card-link topic-card" onClick={()=>setOpenSlug(item.slug)} style={{backgroundImage: `url(${TOPIC_IMAGES[item.slug] || ''})`}}>
                  <div style={{position:'relative', zIndex:2}}>
                    <div className="fw-600">{item.title}</div>
                    <div className="small mt-6">Read in app · Source: NASA Climate Kids</div>
                  </div>
                </button>
              ))}
            </div>

            <h2 className="mt-12">More NASA Climate Kids topics</h2>
            <div className="row grid-3 mt-12">
              {OTHER_SECTIONS.map(item => (
                <button key={item.slug} className="card card-link topic-card" onClick={()=>setOpenSlug(item.slug)} style={{backgroundImage: `url(${TOPIC_IMAGES[item.slug] || ''})`}}>
                  <div style={{position:'relative', zIndex:2}}>
                    <div className="fw-600">{item.title}</div>
                    <div className="small mt-6">Explore: {item.byline}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="small mt-10">Content © NASA Climate Kids. Images are loaded from nasa.gov.</div>
          </div>
        )}

        {current && (
          <article className="card mt-16 nasa-article">
            <div className="small">Big Questions</div>
            <h2 className="mt-6">{current.title}</h2>
            <div className="small mt-6">Source: <a href={current.sourceUrl} target="_blank" rel="noopener noreferrer">NASA Climate Kids</a></div>
            <div className="mt-12 article-content" dangerouslySetInnerHTML={{__html: current.contentHtml}} />
            <div className="mt-14 flex gap-8 wrap">
              <button className="btn" onClick={()=>setOpenSlug(null)}>Back to topics</button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
