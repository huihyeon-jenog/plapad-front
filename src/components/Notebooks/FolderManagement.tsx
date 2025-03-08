'use client';
import { useState } from 'react';
import FolderForm from './FolderForm';
import Slider from './Slider';

export default function FolderManagement() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <button type="button" onClick={onOpen}>
          폴더 추가
        </button>
        <Slider />
      </div>
      {isOpen && <FolderForm onClose={onClose} />}
    </>
  );
}
