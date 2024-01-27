"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

type annotationModalProps = {
  title: string;
}

export default function AnnotationModal(props: annotationModalProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <Button id="annotationButton" className="hidden" onPress={onOpen}></Button>
    <div id='modalDiv'>
    <Modal className="bg-black text-white justify-center" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"} size="full" placement="top">
      <ModalContent>
        {(onClose) => (
          <>
            {/*@ts-ignore*/}
            <ModalHeader class='fade' className="flex gap-1 w-full items-center">
              <p className="text-center text-2xl pt-[20px]">{props.title}</p>
            </ModalHeader>
            <ModalBody>
            <p id="modalVideo" className="hidden"> 
                Annotation video.
              </p>
              <p id="modalMedia"> 
                Annotation image.
              </p>
              <p id="modalText">
                Annotation text, if any.
              </p>
              <p id="modalCitation">
                Photo author and license if applicable.
              </p>
            </ModalBody>
            <ModalFooter className="justify-center">
              <Button className="bg-[#004C46] text-white" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </div>
    </>
  );
}
