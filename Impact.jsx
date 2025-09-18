import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'eco_trees_photos';
const BASE_TREES = 1240; // existing baseline count

export default function Impact(){
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaderName, setUploaderName] = useState('');

  useEffect(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY) || '[]';
      setPhotos(JSON.parse(raw));
    }catch(e){ setPhotos([]); }
  },[]);

  function persist(next){
    setPhotos(next);
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }catch(e){}
  }

  function handleFiles(files){
    if(!files || !files.length) return;
    setUploading(true);
    const readers = Array.from(files).map((file, i)=> new Promise((res, rej)=>{
      const reader = new FileReader();
      reader.onload = ()=> res({ id: Date.now()+i, data: reader.result, name: file.name, t: Date.now(), uploader: uploaderName || '' });
      reader.onerror = rej;
      reader.readAsDataURL(file);
    }));
    Promise.all(readers).then(results=>{
      const next = [...results, ...photos];
      persist(next);
      setUploading(false);
      setUploaderName('');
    }).catch(()=> setUploading(false));
  }

  function onFileChange(e){
    handleFiles(e.currentTarget.files);
    e.currentTarget.value = '';
  }

  function removePhoto(id){
    const next = photos.filter(p=>p.id!==id);
    persist(next);
  }

  const totalTrees = BASE_TREES + (photos?.length||0);

  return (
    <section className="section">
      <div className="container">
        <span className="badge">📊 Impact</span>
        <h1 className="h1">Track real‑world outcomes</h1>
        <p className="lead">Measure progress across classes and semesters—turn small actions into campus‑wide change.</p>

        <div className="row grid-3 mt-16">
          <div className="card"><strong>Trees Planted</strong><div className="stat" id="trees-planted">{totalTrees.toLocaleString()}</div></div>
          <div className="card"><strong>Waste Collected</strong><div className="stat">680 kg</div></div>
          <div className="card"><strong>Participation</strong><div className="stat">87%</div></div>
        </div>

        <div className="mt-16"><a className="btn primary" href="/dashboard">View live leaderboard</a></div>

        <hr style={{margin:'32px 0',borderColor:'var(--border)'}} />

        <div className="card mt-12">
          <div className="small">Community</div>
          <h2 className="mt-6">Upload tree planting photos</h2>
          <p className="small mt-6">Share photos from tree planting events. Each verified planting photo counts toward the "Trees Planted" total. (This demo stores uploads locally in your browser.)</p>

          <div className="mt-12 grid-col">
            <input className="input" type="text" placeholder="Your name (optional)" value={uploaderName} onChange={(e)=>setUploaderName(e.target.value)} />
            <input className="input mt-10" type="file" accept="image/*" multiple onChange={onFileChange} />
            <div className="mt-10">
              <button className="btn primary" onClick={()=>document.querySelector('input[type=file]')?.click()} disabled={uploading}>{uploading? 'Uploading...':'Choose photos to upload'}</button>
            </div>
          </div>

          <div className="mt-12">
            <div className="small">Uploaded photos ({photos.length})</div>
            {photos.length===0 && <div className="small mt-6">No photos uploaded yet.</div>}
            {photos.length>0 && (
              <div className="photo-grid mt-10">
                {photos.map(p=> (
                  <figure key={p.id} className="photo-thumb">
                    <img src={p.data} alt={p.name||'Tree planting photo'} />
                    <figcaption className="small">{p.uploader || 'Anonymous'} · {new Date(p.t).toLocaleDateString()}</figcaption>
                    <button className="btn ghost" onClick={()=>removePhoto(p.id)}>Remove</button>
                  </figure>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
