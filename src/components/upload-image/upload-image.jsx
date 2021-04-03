import React, { useRef, useState } from 'react';
import superagent from 'superagent';
import Button from '../button/button';
import ImageEditor from '@toast-ui/react-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import './upload-image.scss';
import ResultPreview from '../result-preview/result-preview';

function UploadImage({
  serverUrl = '',
}) {
  const formRef = useRef(null);
  const selectRef = useRef(null);
  const imageEditorRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    superagent
      .post(serverUrl)
      .send({ images: previews })
      .then(res => setResults(res.body))
      .catch(err => console.log(err));
  };

  const handleClick = () => {
    selectRef.current?.click();
  };

  const handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { files } = event.dataTransfer || selectRef.current;
    for (const file of files) {
      if (file.type.startsWith('image/') && !previews.find(el => el.name === file.name)) {
        const reader = new FileReader();

        reader.addEventListener('load', ({ target: { result: image }}) => {
          setPreviews([...previews, { image, name: file.name }]);
        }, false);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemovePreview = (preview) => () => {
    setPreviews(previews.filter(el => el !== preview));
  };

  const handleSaveEditingImage = () => {
    const { imageEditorInst } = imageEditorRef.current;
    const data = imageEditorInst.toDataURL();
    if (data) {
      setPreviews(prevState => {
        const changedImage = prevState.find(el => el === editingImage);
        changedImage.image = data;
        setEditingImage(null);
        return [...prevState.filter(el => el !== editingImage), changedImage];
      });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClearResults = () => setResults([]);

  return (
    <form
      ref={formRef}
      className="upload-image wrapper"
      name="upload-image"
      onSubmit={handleSubmit}
      onDrop={handleChange}
      onDragOver={handleDragOver}
    >
      <ResultPreview elements={results} ref={formRef} clear={handleClearResults} />
      <div className="upload-image__controls">
        {editingImage && (
          <Button
            className="upload-image__preview-save"
            onClick={handleSaveEditingImage}
          >
            Сохранить
          </Button>
        )}
        <div className="upload-image__select-container">
          <Button className="upload-image__select-button" onClick={handleClick}>
            Выбрать фотографии
            <input
              ref={selectRef}
              className="hide"
              type="file"
              multiple
              accept="image/jpeg"
              onChange={handleChange}
            />
          </Button>
          <span>Или перетащите сюда файлы</span>
        </div>
        {previews.length > 0 && (
          <Button type="submit" className="upload-image__send-button">
            Отправить &#8594;
          </Button>
        )}
      </div>
      <div className="upload-image__content">
        <div className="upload-image__preview-container">
          {previews.map(preview => (
            <div key={preview.name} className="upload-image__preview">
              <div className="upload-image__preview-controls">
                <Button
                  className="upload-image__preview-edit"
                  onClick={() => setEditingImage(preview)}
                >
                  Изменить
                </Button>
                <Button
                  className="upload-image__preview-remove"
                  onClick={handleRemovePreview(preview)}
                >
                  X
                </Button>
              </div>
              <img src={preview.image} className="upload-image__preview-image" alt="" />
              <span className="upload-image__preview-name">{preview.name}</span>
            </div>
          ))}
        </div>
        <div className="upload-image__editor">
          {editingImage && (
            <ImageEditor
              ref={imageEditorRef}
              includeUI={{
                loadImage: {
                  path: editingImage.image,
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
