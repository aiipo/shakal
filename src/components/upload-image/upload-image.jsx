import React, { useRef, useState } from 'react';
import superagent from 'superagent';
import Button from '../button/button';
import ImageEditor from '@toast-ui/react-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import './upload-image.scss';

function UploadImage({
  serverUrl = '',
}) {
  const selectRef = useRef(null);
  const imageEditorRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [editingImage, setEditingImage] = useState(null);

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
    selectRef.current?.click();
  };

  const handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { files } = selectRef.current;
    for (const file of files) {
      if (file.type.startsWith('image/') && !previews.find(el => el.name === file.name)) {
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

  const handleSaveEditingImage = () => {
    const { imageEditorInst } = imageEditorRef.current;
    const data = imageEditorInst.toDataURL();
    if (data) {
      setPreviews(prevState => {
        const changedImage = prevState.find(el => el.name === editingImage.name);
        changedImage.result = data;
        setEditingImage(null);
        return [...prevState.filter(el => el !== editingImage), changedImage];
      });
    }
  };

  return (
    <form className="upload-image wrapper" name="upload-image" onSubmit={handleSubmit}>
      <div className="upload-image__controls">
        {editingImage && (
          <Button
            className="upload-image__preview-save"
            onClick={handleSaveEditingImage}
          >
            Сохранить
          </Button>
        )}
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
      <div className="upload-image__content">
        <div className="upload-image__preview-container">
          {previews.map(({ name, result }) => (
            <div key={name} className="upload-image__preview">
              <div className="upload-image__preview-controls">
                <Button
                  className="upload-image__preview-edit"
                  onClick={() => setEditingImage(previews.find(el => el.name === name))}
                >
                  Изменить
                </Button>
                <Button
                  className="upload-image__preview-remove"
                  onClick={() => handleRemovePreview(name)}
                >
                  X
                </Button>
              </div>
              <img src={result} className="upload-image__preview-image" alt="" />
              <span className="upload-image__preview-name">{name}</span>
            </div>
          ))}
        </div>
        <div className="upload-image__editor">
          {editingImage && (
            <ImageEditor
              ref={imageEditorRef}
              includeUI={{
                loadImage: {
                  path: editingImage.result,
                  name: editingImage.name,
                },
                menu: ['crop', 'flip', 'rotate', 'filter'],
              }}
              usageStatistics={false}
            />
          )}
        </div>
      </div>
    </form>
  );
}

export default UploadImage;
