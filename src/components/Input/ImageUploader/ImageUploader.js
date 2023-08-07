import UploadImgPng from "../../../assets/images/uploadImage.png";
import Image from 'next/image';


const ImageUploader = ({onChange, file}) => {
  
  return (
    <div >
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        style={{ display: 'none' }}
        id="image-input"
      />
      <label htmlFor="image-input">
        <Image
          src={file ? file : UploadImgPng}
          width={ file ? 300 : 500}
          height={200}
          alt="Uploaded Image"
          style={{ cursor: 'pointer' }}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
