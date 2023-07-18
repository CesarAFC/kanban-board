import {useState} from 'react';

export const useModal = (initialValue: boolean): [boolean, () => void] => {
    const [isOpen, setIsOpen] = useState<boolean>(initialValue);
    const toggleModal = () => setIsOpen(!isOpen);
    // const openModal = () => setIsOpen(true);
    // const closeModal = () => setIsOpen(false);

  return [
    isOpen,
    toggleModal,
  ] 
}