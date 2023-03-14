import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
      // height: "28px",
    },
  },
  variants: {
    solid: {
      color: "black",
      bg: "none",
      _hover: {
        bg: "gray.100",
      },
    },
    login: {
      color: "white",
      borderRadius: "10px",
      bg: "blue.300",
      _hover: {
        bg: "blue.400",
      },
    },
  },
};
