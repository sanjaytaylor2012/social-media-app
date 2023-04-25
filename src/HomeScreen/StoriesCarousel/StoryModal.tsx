import { AuthenticationModalState } from "@/atoms/AuthenticationAtom";
import SignInInputs from "@/Login/Inputs/SignInInputs";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Flex,
  Icon,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MdAddToPhotos } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import NewStoryModal from "./NewStoryModal";
import ViewStoryModal from "./ViewStoryModal";

type StoryModalProps = {
  openNewStoryModal: boolean;
  setOpenNewStoryModal: (input: boolean) => void;
};

const StoryModal: React.FC<StoryModalProps> = ({
  openNewStoryModal,
  setOpenNewStoryModal,
}) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedModal, setSelectedModal] = useState("SelectImage");

  return (
    <>
      <Modal
        isOpen={openNewStoryModal}
        onClose={() => {
          setSelectedFile("");
          setSelectedModal("SelectImage");
          setOpenNewStoryModal(false);
        }}
      >
        {selectedModal === "SelectImage" && (
          <NewStoryModal
            setSelectedFile={setSelectedFile}
            setSelectedModal={setSelectedModal}
          />
        )}
        {selectedModal === "ViewImage" && (
          <ViewStoryModal
            selectedFile={selectedFile}
            setSelectedModal={setSelectedModal}
            setOpenNewStoryModal={setOpenNewStoryModal}
          />
        )}
      </Modal>
    </>
  );
};
export default StoryModal;
