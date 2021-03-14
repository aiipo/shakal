import React, { useRef, useState } from 'react';
import superagent from 'superagent';
import Button from '../button/button';
import './upload-image.scss';

function UploadImage({
  serverUrl = '',
}) {
  const selectRef = useRef(null);
  const [previews, setPreviews] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(serverUrl);
    superagent
      .post(serverUrl)
      .send({ images: previews })
      .end((err, res) => console.log(err, res));
  };

  const handleClick = () => {
    if (selectRef.current) {
      selectRef.current.click();
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { files } = selectRef.current;
    console.log('added', files);
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.addEventListener('load', ({ target: { result }}) => {
          setPreviews(prevState => [...prevState, { result, name: file.name }]);
        }, false);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemovePreview = (name) => {
    setPreviews(prevState => prevState.filter(el => el.name !== name));
  };

  return (
    <form className="upload-image wrapper" name="upload-image" onSubmit={handleSubmit}>
      <div className="upload-image__controls">
        <Button className="upload-image__select-button" onClick={handleClick}>
          Выберете фотографии
          <input
            ref={selectRef}
            className="hide"
            type="file"
            multiple
            accept="image/jpeg"
            onChange={handleChange}
          />
        </Button>
        {previews.length > 0 && (
          <Button type="submit" className="upload-image__send-button">
            Отправить &#8594;
          </Button>
        )}
      </div>
      <div className="upload-image__preview-container">
        {previews.map(({ name, result }) => (
          <div className="upload-image__preview">
            <div className="upload-image__preview-controls">
              <Button
                className="upload-image__preview-remove"
                onClick={() => handleRemovePreview(name)}
              >
                X
              </Button>
            </div>
            <img key={name} src={result} className="upload-image__preview-image" alt="" />
            <span className="upload-image__preview-name">{name}</span>
          </div>
        ))}
      </div>
    </form>
  );
}

export default UploadImage;
