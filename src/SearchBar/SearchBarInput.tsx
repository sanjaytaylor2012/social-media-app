import {
  InputPostState,
  CrossCheckPostState,
} from "@/atoms/SearchBarInputAtom";
import { UserType } from "@/atoms/userAtom";
import { firestore } from "@/firebase/clientApp";
import ProfilePage from "@/pages/[userId]";
import {
  Flex,
  Input,
  Stack,
  Text,
  Image,
  Button,
  MenuList,
  MenuItem,
  Menu,
  Box,
  Icon,
} from "@chakra-ui/react";
import { getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { BiEqualizer } from "react-icons/bi";
import { useRecoilState } from "recoil";
import SearchIcon from "./SearchIcon";

type SearchBarInputProps = { onClose: (input: boolean) => void };

const SearchBarInput: React.FC<SearchBarInputProps> = ({ onClose }) => {
  const [inputPostState, setInputState] = useRecoilState(InputPostState);
  const [crossCheckPostState, setCrossCheckPostState] =
    useRecoilState(CrossCheckPostState);

  const crossCheckUsers = (inputName: string) => {
    if (inputPostState) {
      const usersToSet = inputPostState.users.filter(
        (user: UserType) =>
          user.displayName.slice(0, inputName.length).toLowerCase() ===
          inputName.toLowerCase()
      );

      setCrossCheckPostState((prev) => ({
        ...prev,
        users: usersToSet as UserType[],
      }));
    }

    console.log("users to show", crossCheckPostState);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != "") {
      crossCheckUsers(event.target.value);
    } else {
      setCrossCheckPostState((prev) => ({
        ...prev,
        users: [],
      }));
    }
  };

  return (
    <>
      <Input
        onChange={onChange}
        _focus={{
          border: "0px solid",
          boxShadow: "0 0 0px 1000px #E2E8F0 inset",
        }}
        borderColor="transparent"
        border="none"
        bg="gray.200"
        placeholder="Type here..."
      />
      {crossCheckPostState &&
        crossCheckPostState.users.map((item) => {
          return <SearchIcon item={item} onClose={onClose} />;
        })}
    </>
  );
};
export default SearchBarInput;
