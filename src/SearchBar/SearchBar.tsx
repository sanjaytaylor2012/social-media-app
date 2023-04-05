import { NavBarState } from "@/atoms/SearchBarAtom";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import React from "react";
import { useSetRecoilState } from "recoil";
import SearchBarInput from "./SearchBarInput";

type SearchBarProps = {
  onClose: (input: boolean) => void;
  isOpen: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const setSelectedTab = useSetRecoilState(NavBarState);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={() => {
          onClose(false);
          setSelectedTab((prev) => ({
            previousTab: "Search",
            selectedTab: prev.previousTab,
          }));
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader mt={5}>Search</DrawerHeader>

          <DrawerBody>
            <SearchBarInput onClose={onClose} />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SearchBar;
