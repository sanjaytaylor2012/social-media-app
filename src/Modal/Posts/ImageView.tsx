import {
  Flex,
  Icon,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, {
  ReactEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BsArrowLeft } from "react-icons/bs";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type ImageViewProps = {
  setSelectedFile: (input: string) => void;
  setSelectedModal: (input: string) => void;
  selectedFile: string;
  imageDimensions: { width: number; height: number };
};

const ImageView: React.FC<ImageViewProps> = ({
  setSelectedFile,
  selectedFile,
  setSelectedModal,
  imageDimensions,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [image, setImage] = useState("");

  const crop1 = (cropType: number) =>
    centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },

        cropType,
        imageDimensions.width,
        imageDimensions.height
      ),
      imageDimensions.width,
      imageDimensions.height
    );

  useEffect(() => {
    console.log(imageDimensions);
    setCrop(crop1(2 / 3));
  }, [imageDimensions]);

  const saveCrop = async () => {
    // if (crop) {
    //   let image1 = new Image();
    //   image1.src = selectedFile;
    //   image1.onload = () => {
    //     const canvas = document.createElement("canvas");
    //     const scaleX = image1.naturalWidth / image1.width;
    //     const scaleY = image1.naturalHeight / image1.height;
    //     canvas.width = crop.width;
    //     canvas.height = crop.height;
    //     const ctx = canvas.getContext("2d");

    //     if (ctx) {
    //       const pixelRatio = window.devicePixelRatio;
    //       canvas.width = crop.width * pixelRatio;
    //       canvas.height = crop.height * pixelRatio;
    //       ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    //       ctx.imageSmoothingQuality = "high";

    //       ctx.drawImage(
    //         image1,
    //         crop.x * scaleX,
    //         crop.y * scaleY,
    //         crop.width * scaleX,
    //         crop.height * scaleY,
    //         0,
    //         0,
    //         crop.width,
    //         crop.height
    //       );
    //       // Converting to base64

    //       const base64Image = canvas.toDataURL("image/jpeg");
    //       setImage(base64Image);

    //     }
    //   };
    // }
    setSelectedModal("Post");
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent width="350px">
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Icon
              onClick={() => {
                setSelectedFile("");
                setSelectedModal("SelectImage");
              }}
              cursor="pointer"
              fontSize={30}
              as={BsArrowLeft}
            />
            <Text fontWeight={400} fontSize="12pt">
              Crop
            </Text>
            <Text
              cursor="pointer"
              color="blue.400"
              fontWeight={400}
              fontSize="12pt"
              onClick={saveCrop}
            >
              Next
            </Text>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <ReactCrop
            ruleOfThirds={true}
            locked={true}
            crop={crop}
            onChange={(c) => setCrop(c)}
          >
            <img src={selectedFile} />
          </ReactCrop>
        </ModalBody>
        {image && <img src={image} />}
      </ModalContent>
    </>
  );
};
export default ImageView;
