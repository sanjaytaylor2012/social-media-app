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
import SelectPic from "./SelectPic";
import { BsArrowLeft } from "react-icons/bs";
import ImageView from "./ImageView";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import PostImage from "./PostImage";
import { NavBarState } from "@/atoms/SearchBarAtom";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedModal, setSelectedModal] = useState("SelectImage");
  const setSelectedTab = useSetRecoilState(NavBarState);

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const onSelectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        let image = new Image();
        image.src = readerEvent.target?.result as string;
        image.onload = () => {
          setImageDimensions({
            width: image.width,
            height: image.height,
          });
        };
        setSelectedFile(readerEvent.target?.result as string);

        setSelectedModal("ViewImage");
      }
    };
  };

  return (
    <>
      <Modal
        isOpen={true}
        onClose={() =>
          setSelectedTab((prev) => ({
            selectedTab: prev.previousTab,
            previousTab: "Create",
          }))
        }
      >
        {selectedModal === "SelectImage" && (
          <SelectPic onSelectImage={onSelectImage} />
        )}
        {selectedModal === "ViewImage" && (
          <ImageView
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedModal={setSelectedModal}
            imageDimensions={imageDimensions}
          />
        )}
        {selectedModal === "Post" && (
          <PostImage
            setSelectedModal={setSelectedModal}
            selectedFile={selectedFile}
          />
        )}
      </Modal>
    </>
  );
};
export default AuthModal;
