import { theme } from "@/chakra/theme";
import { auth } from "@/firebase/clientApp";
import Layout from "@/Layout/Layout";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth);

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
