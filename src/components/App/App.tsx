import { useState } from "react";

import { Modal, ModalProvider } from "../../ui/Modal";
import { Button } from "../../ui/Button";

import styles from "./App.module.css";

export function App() {
  const [isBaseOpen, setIsBaseOpen] = useState(false);
  const [isLongcontentOpen, setIsLongContentOpen] = useState(false);
  const [isWithOneControlOpen, setIsWithOneControlOpen] = useState(false);
  const [isWithoutFooterOpen, setIsWithoutFooterOpen] = useState(false);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Demo Page</h1>
      </header>

      <ModalProvider>
        <Button onClick={() => setIsBaseOpen(true)} text="Open base modal" />
        <Modal
          title="Title"
          isOpen={isBaseOpen}
          onClose={() => setIsBaseOpen(false)}
          footer={{
            action: {
              text: "Save",
            },
            dismiss: {
              text: "Cancel",
            },
          }}
        >
          Content
        </Modal>

        <Button
          onClick={() => setIsLongContentOpen(true)}
          text="Open modal with long content"
        />
        <Modal
          title="Title"
          isOpen={isLongcontentOpen}
          onClose={() => setIsLongContentOpen(false)}
          footer={{
            action: {
              text: "Save",
            },
            dismiss: {
              text: "Cancel",
            },
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
          accumsan neque, vitae dignissim ipsum. Praesent aliquam bibendum nunc.
          Nullam vel leo turpis. Sed mollis pellentesque turpis vel dignissim.
          Nunc ligula diam, cursus id dui a, hendrerit iaculis eros. Ut massa
          arcu, porttitor eleifend turpis nec, venenatis suscipit nisi. Vivamus
          volutpat auctor lobortis. Cras mauris tellus, rutrum ac magna a,
          elementum scelerisque quam. Quisque sed vehicula lacus, sit amet
          tincidunt augue. Cras ultricies arcu at rhoncus faucibus. Nulla eget
          est sapien. Donec vestibulum quis nunc et hendrerit. Curabitur
          malesuada volutpat eros. Sed urna augue, scelerisque non dignissim et,
          gravida sed ex. Nunc pharetra, eros feugiat ullamcorper egestas, ex
          erat suscipit purus, in aliquet leo felis vel orci. Sed finibus rutrum
          risus id fermentum. Nunc ac nisi gravida, iaculis justo eget, varius
          urna. Nullam efficitur eleifend ex ultrices commodo. Duis at dictum
          lacus. Praesent at risus sodales nisl consectetur commodo.
        </Modal>

        <Button
          onClick={() => setIsWithOneControlOpen(true)}
          text="Open modal with one control"
        />
        <Modal
          title="Title"
          isOpen={isWithOneControlOpen}
          onClose={() => setIsWithOneControlOpen(false)}
          footer={{
            action: {
              text: "Save",
            },
          }}
        >
          Content
        </Modal>

        <Button
          onClick={() => setIsWithoutFooterOpen(true)}
          text="Open modal without footer"
        />
        <Modal
          title="Title"
          isOpen={isWithoutFooterOpen}
          onClose={() => setIsWithoutFooterOpen(false)}
        >
          Content
        </Modal>
      </ModalProvider>
    </main>
  );
}
