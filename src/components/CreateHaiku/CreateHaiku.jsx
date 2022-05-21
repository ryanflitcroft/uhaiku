import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHaiku } from '../../hooks/useHaiku';
import { uploadImage } from '../../services/fetch-utils';

export default function CreateHaiku() {
  const { addHaiku } = useHaiku();
  const [title, setTitle] = useState('');
  const [lineOne, setLineOne] = useState('');
  const [lineTwo, setLineTwo] = useState('');
  const [lineThree, setLineThree] = useState('');
  const [image, setImage] = useState({});
  const [alt, setAlt] = useState('');
  const history = useHistory();

  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const haikuImage = await uploadImage(image);
    await addHaiku({
      title,
      line_one: lineOne,
      line_two: lineTwo,
      line_three: lineThree,
      image: `https://kyhyvkpvpfgdixqgujqe.supabase.co/storage/v1/object/public/${haikuImage.Key}`,
      alt,
    });

    history.replace('/');
  };

  return (
    <>
      <form
        aria-label="input and data to create your haiku"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Give your Haiku a title:</label>
        <input
          type="text"
          name="title"
          placeholder="Space Needle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="lineOne">Five syllables:</label>
        <input
          type="text"
          name="lineOne"
          placeholder="Wheedle the Needle"
          value={lineOne}
          onChange={(e) => setLineOne(e.target.value)}
          required
        />
        <label htmlFor="lineTwo">Seven syllables:</label>
        <input
          type="text"
          name="lineTwo"
          placeholder="a red light flashing"
          value={lineTwo}
          onChange={(e) => setLineTwo(e.target.value)}
          required
        />
        <label htmlFor="lineThree">Five syllables:</label>
        <input
          type="text"
          name="lineThree"
          placeholder="through morning rain"
          value={lineThree}
          onChange={(e) => setLineThree(e.target.value)}
          required
        />
        <label htmlFor="image">Upload image:</label>
        <input
          aria-label="upload image"
          type="file"
          name="image"
          accept="image/ *"
          onChange={handleUpload}
          required
        />
        <label htmlFor="altText">Image description:</label>
        <input
          type="text"
          name="altText"
          placeholder="view of the Puget Sound"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          required
        />
        <button>Submit</button>
      </form>
    </>
  );
}
