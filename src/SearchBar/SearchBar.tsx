import { NavBarState } from "@/atoms/SearchBarAtom";
import {
  CrossCheckPostState,
  InputPostState,
} from "@/atoms/SearchBarInputAtom";
import { UserType } from "@/atoms/userAtom";
import { firestore } from "@/firebase/clientApp";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { getDocs, collection } from "firebase/firestore";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import SearchBarInput from "./SearchBarInput";
import SearchIcon from "./SearchIcon";

type SearchBarProps = {
  onClose: (input: boolean) => void;
  isOpen: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const setSelectedTab = useSetRecoilState(NavBarState);

  const [crossCheckPostState, setCrossCheckPostState] =
    useRecoilState(CrossCheckPostState);

  const [inputPostState, setInputState] = useRecoilState(InputPostState);

  const getProfiles = async () => {
    const users = await getDocs(collection(firestore, `users`));
    const userDocs = users.docs.map((user) => ({
      //   id: user.id,
      ...user.data(),
    }));

    setInputState((prev) => ({
      ...prev,
      users: userDocs as UserType[],
    }));

    console.log(inputPostState.users);
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={() => {
          onClose(false);
          setCrossCheckPostState({ users: [] });
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

            {crossCheckPostState.users.length == 0 && (
              <Text fontSize={20} mt={5}>
                Suggested:{" "}
              </Text>
            )}
            {crossCheckPostState.users.length == 0 &&
              inputPostState.users.slice(0, 5).map((item) => {
                return <SearchIcon item={item} onClose={onClose} />;
              })}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SearchBar;
