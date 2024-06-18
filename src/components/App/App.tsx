import { useState, useRef } from "react";

import { Modal, ModalProvider, type ModalProps } from "../../ui/Modal";
import { Button } from "../../ui/Button";

import styles from "./App.module.css";

/**
 * DemoModal component for demonstrating a modal triggered by a button
 * Combines a Button component as a trigger and a Modal component for displaying content
 *
 * @param triggerText The text displayed on the trigger button
 */
const DemoModal = ({
  triggerText,
  ...props
}: Omit<ModalProps, "title" | "isOpen" | "onClose"> & {
  triggerText: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef(null);

  return (
    <>
      <Button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        text={triggerText}
      />
      <Modal
        {...props}
        title="Title"
        triggerRef={triggerRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export function App() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Demo Page</h1>
      </header>

      <ModalProvider>
        <DemoModal
          triggerText="Open base modal"
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
        </DemoModal>

        <DemoModal
          triggerText="Open modal with long content"
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
        </DemoModal>

        <DemoModal
          triggerText="Open modal with one control"
          footer={{
            action: {
              text: "Save",
            },
          }}
        >
          Content
        </DemoModal>

        <DemoModal triggerText="Open modal without footer">Content</DemoModal>

        <DemoModal
          triggerText="Open modal with disabled action"
          footer={{
            action: {
              text: "Save",
              disabled: true,
            },
            dismiss: {
              text: "Cancel",
            },
          }}
        >
          Content
        </DemoModal>
      </ModalProvider>
    </main>
  );
}
