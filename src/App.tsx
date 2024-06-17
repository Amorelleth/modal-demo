import { useState } from "react";

import { Modal, ModalProvider } from "./ui/Modal";

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNested, setIsOpenNested] = useState(false);

  return (
    <>
      <h1>Page</h1>

      <ModalProvider>
        <button onClick={() => setIsOpen(true)}>Open modal</button>
        <Modal title="Title" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          Content
          <button onClick={() => setIsOpenNested(true)}>
            Open nested modal
          </button>
          <Modal
            title="Nested modal title"
            isOpen={isOpenNested}
            onClose={() => setIsOpenNested(false)}
          >
            Nested content
          </Modal>
        </Modal>
      </ModalProvider>
    </>
  );
}
