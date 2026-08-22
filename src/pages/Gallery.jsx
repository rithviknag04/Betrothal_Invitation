import React, { useState } from 'react';
import { Heart, Upload, X, Camera, RefreshCw, Trash2, ArrowLeft, Plus, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import coupleHero from '../assets/couple_hero.png';
import galleryRing from '../assets/gallery_ring.png';
import galleryVenue from '../assets/gallery_venue.png';
import galleryDetails from '../assets/gallery_details.png';

const initialPhotos = [
  {
    src: coupleHero,
    uploader: 'Prajwala & Shravan',
    title: 'Prajwala & Shravan',
    desc: 'Shared moments of love and joy.',
  },
  {
    src: galleryRing,
    uploader: 'Prajwala & Shravan',
    title: 'The Engagement',
    desc: 'The beautiful start of our forever.',
  },
  {
    src: galleryVenue,
    uploader: 'Prajwala & Shravan',
    title: 'Our Venue',
    desc: 'Where we will say our vows.',
  },
  {
    src: galleryDetails,
    uploader: 'Prajwala & Shravan',
    title: 'The Table Details',
    desc: 'Setting the scene for our celebration.',
  },
];

export default function Gallery() {
  const { t } = useLanguage();

  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('wedding_gallery_photos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Backwards compatibility: ensure all parsed photos have an uploader field
        return parsed.map(photo => ({
          ...photo,
          uploader: photo.uploader || 'Guest Upload'
        }));
      } catch (e) {
        console.error("Failed to load saved gallery photos", e);
      }
    }
    return initialPhotos;
  });

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Upload Form States
  const [uploadName, setUploadName] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [images, setImages] = useState([]); // Array of { id, src }
  const [errorMsg, setErrorMsg] = useState('');

  // Group photos by uploader to construct folders
  const getFolders = () => {
    const folderMap = {};
    
    photos.forEach(photo => {
      const uploader = photo.uploader || 'Guest Upload';
      if (!folderMap[uploader]) {
        folderMap[uploader] = {
          uploader,
          count: 0,
          cover: photo.src
        };
      }
      folderMap[uploader].count += 1;
    });

    // Make sure 'Prajwala & Shravan' folder is first if it exists
    const foldersArray = Object.values(folderMap);
    foldersArray.sort((a, b) => {
      if (a.uploader === 'Prajwala & Shravan') return -1;
      if (b.uploader === 'Prajwala & Shravan') return 1;
      return a.uploader.localeCompare(b.uploader);
    });

    return foldersArray;
  };

  const folders = getFolders();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setErrorMsg('');

    files.forEach(file => {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg(t('Some images exceeded the 2MB size limit and were skipped.'));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [
          ...prev,
          { id: Math.random().toString(36).substring(2, 9), src: reader.result }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePreview = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setErrorMsg(t('Please select at least one photo.'));
      return;
    }
    if (!uploadName.trim()) {
      setErrorMsg(t('Please enter your name.'));
      return;
    }

    const uploaderName = uploadName.trim();
    const newPhotos = images.map((img, index) => {
      const caption = uploadTitle.trim() 
        ? (images.length > 1 ? `${uploadTitle.trim()} (${index + 1})` : uploadTitle.trim())
        : 'Shared Memory';

      return {
        src: img.src,
        uploader: uploaderName,
        title: caption,
        desc: uploadDesc.trim() || 'A sweet moment shared by a guest.',
      };
    });

    const updatedPhotos = [...newPhotos, ...photos];
    setPhotos(updatedPhotos);
    localStorage.setItem('wedding_gallery_photos', JSON.stringify(updatedPhotos));

    // Open the new uploader's folder automatically
    setSelectedFolder(uploaderName);

    // Reset state & close
    setUploadName('');
    setUploadTitle('');
    setUploadDesc('');
    setImages([]);
    setErrorMsg('');
    setIsModalOpen(false);
  };

  const handleDeletePhoto = (photoToDelete) => {
    if (window.confirm(t('Are you sure you want to delete this photo permanently?'))) {
      const updatedPhotos = photos.filter(p => p !== photoToDelete);
      setPhotos(updatedPhotos);
      localStorage.setItem('wedding_gallery_photos', JSON.stringify(updatedPhotos));

      // If the active folder is now empty, return to folders view
      const remainingInFolder = updatedPhotos.filter(p => p.uploader === selectedFolder);
      if (remainingInFolder.length === 0) {
        setSelectedFolder(null);
      }
    }
  };

  const handleResetGallery = () => {
    if (window.confirm(t('Are you sure you want to reset the gallery? This will permanently delete all guest uploads.'))) {
      setPhotos(initialPhotos);
      localStorage.removeItem('wedding_gallery_photos');
      setSelectedFolder(null);
    }
  };

  return (
    <div className="gallery-page animate-fade-in">
      <section className="section gallery-hero" style={{ paddingBottom: '30px' }}>
        <div className="container text-center">
          <h1 className="page-title">{t('Photo Gallery')}</h1>
          <p className="page-subtitle">{t('A glimpse into our favorite moments, shared by family & friends')}</p>
          <div className="botanical-divider">
            <div className="botanical-line"></div>
            <div className="botanical-icon">
              <Heart size={16} fill="currentColor" />
            </div>
            <div className="botanical-line"></div>
          </div>

          <div className="gallery-actions-container">
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
              <Upload size={16} />
              {t('Share Photos')}
            </button>
          </div>
        </div>
      </section>

      <section className="gallery-grid-section" style={{ paddingBottom: '60px' }}>
        <div className="container">
          
          {selectedFolder === null ? (
            /* Album Folders View */
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '24px', textAlign: 'center' }}>{t('Shared Albums')}</h2>
              {folders.length === 0 ? (
                <div className="gallery-empty-state glass-panel">
                  <Camera size={48} style={{ color: 'var(--text-gold)', marginBottom: '16px' }} />
                  <h3>{t('No Albums in Gallery')}</h3>
                  <p>{t('Be the first to upload and share a beautiful memory!')}</p>
                </div>
              ) : (
                <div className="folder-grid">
                  {folders.map((folder, idx) => (
                    <div key={idx} className="folder-card" onClick={() => setSelectedFolder(folder.uploader)}>
                      <div className="folder-thumbnail-wrapper">
                        <img src={folder.cover} alt={folder.uploader} className="folder-thumbnail" />
                      </div>
                      <div className="folder-info">
                        <span className="folder-title" title={folder.uploader}>
                          {folder.uploader === 'Prajwala & Shravan' ? t('Prajwala Nag & Shravan Kumar') : folder.uploader}
                        </span>
                        <span className="folder-count">
                          {folder.count} {folder.count === 1 ? t('photo') : t('photos')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Single Album Photos View */
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <button 
                  className="btn-secondary" 
                  onClick={() => setSelectedFolder(null)}
                  style={{ display: 'inline-flex', padding: '8px 16px', letterSpacing: '1px', textTransform: 'none', gap: '6px' }}
                >
                  <ArrowLeft size={16} />
                  {t('Back to Albums')}
                </button>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: 0 }}>
                  {t('Album: ')} {selectedFolder === 'Prajwala & Shravan' ? t('Prajwala Nag & Shravan Kumar') : selectedFolder}
                </h2>
                <div style={{ width: '120px' }}></div> {/* Spacer for centering on desktop */}
              </div>

              <div className="gallery-grid">
                {photos
                  .filter(photo => photo.uploader === selectedFolder)
                  .map((photo, idx) => (
                    <div key={idx} className="gallery-item glass-card animate-fade-in-scale">
                      <div className="gallery-image-wrapper">
                        <img src={photo.src} alt={t(photo.title)} className="gallery-image" />
                        
                        {/* Download button */}
                        <a 
                          href={photo.src} 
                          download={t(photo.title) || 'wedding-photo'} 
                          className="photo-download-btn"
                          title="Download photo"
                        >
                          <Download size={16} />
                        </a>

                        {/* Delete moderation button - only for guest uploads */}
                        {photo.uploader !== 'Prajwala & Shravan' && (
                          <button 
                            className="photo-delete-btn" 
                            onClick={() => handleDeletePhoto(photo)}
                            title="Delete photo permanently"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}

                        <div className="gallery-overlay">
                          <div className="gallery-overlay-content">
                            <h3>{t(photo.title)}</h3>
                            <p>{t(photo.desc)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {new URLSearchParams(window.location.search).get('admin') === 'true' && photos.length !== initialPhotos.length && (
            <div className="text-center" style={{ marginTop: '56px' }}>
              <button 
                onClick={handleResetGallery} 
                className="btn-secondary" 
                style={{ fontSize: '0.8rem', padding: '8px 16px', textTransform: 'none', letterSpacing: '1px', gap: '6px' }}
              >
                <RefreshCw size={14} />
                {t('Reset Default Gallery')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content-wrap glass-panel" onClick={(e) => e.stopPropagation()} style={{ padding: '32px' }}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>
            
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>{t('Upload Photos')}</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>
              {t('Share your favorite memories with Prajwala & Shravan!')}
            </p>

            <form onSubmit={handleUploadSubmit}>
              {errorMsg && (
                <div className="error-text" style={{ textAlign: 'center', marginBottom: '12px', fontSize: '0.85rem' }}>
                  {errorMsg}
                </div>
              )}

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '500' }}>
                  {t('Select Photos')}
                </label>
                
                {images.length === 0 ? (
                  <label className="upload-dropzone">
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      onChange={handleFileChange} 
                      style={{ display: 'none' }}
                    />
                    <div className="upload-icon-wrap">
                      <Camera size={24} />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{t('Choose Photo Files')}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t('Hold Ctrl to select multiple (max 2MB each)')}</span>
                  </label>
                ) : (
                  <div className="upload-preview-grid">
                    {images.map((img) => (
                      <div key={img.id} className="preview-thumbnail-card">
                        <img src={img.src} alt="Preview" className="preview-thumbnail-img" />
                        <button 
                          type="button" 
                          className="preview-remove-btn" 
                          onClick={() => handleRemovePreview(img.id)}
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    
                    {/* Add More block inside grid */}
                    <label className="add-more-preview-card">
                      <Plus size={16} />
                      <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>{t('Add More')}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="uploadName" className="form-label" style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '500' }}>
                  {t('Your Name')}
                </label>
                <input
                  type="text"
                  id="uploadName"
                  className="form-input"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="e.g. John Doe"
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="uploadTitle" className="form-label" style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '500' }}>
                  {t('Photo Caption')}
                </label>
                <input
                  type="text"
                  id="uploadTitle"
                  className="form-input"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Celebrations / Happy Times"
                  style={{ width: '100%' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label htmlFor="uploadDesc" className="form-label" style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '500' }}>
                  {t('Short Message')}
                </label>
                <textarea
                  id="uploadDesc"
                  className="form-input form-textarea"
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  placeholder="Leave a sweet note for the couple..."
                  rows={3}
                  style={{ width: '100%', resize: 'none' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Upload size={16} />
                {t('Upload')} {images.length > 0 ? `${images.length} ` : ''}Photo{images.length > 1 ? 's' : ''}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
