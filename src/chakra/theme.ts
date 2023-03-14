// 1. Import `extendTheme`
import "@fontsource/public-sans/300.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/700.css";

import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";
export const theme = extendTheme({
  fonts: {
    body: "Public Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "white",
      },
    }),
  },
  components: {
    //applying global styles to various chakra components
    Button,
  },
});
