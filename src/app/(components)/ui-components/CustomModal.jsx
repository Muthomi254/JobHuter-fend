'use client';

import { Button, Modal } from 'flowbite-react';

export default function CustomModal({ title, size, children, open, onClose }) {
  return (
    <div>
      <Modal show={open} onClose={onClose} size={size} unmountOnClose={false}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
}
