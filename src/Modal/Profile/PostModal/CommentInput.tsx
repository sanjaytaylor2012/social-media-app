import { Stack, Divider, Flex, Input, Button, Text } from "@chakra-ui/react";
import React, { FormEventHandler } from "react";

type CommentInputProps = {
  loading: boolean;
  setComment: (input: string) => void;
  handleAddComment: FormEventHandler<HTMLFormElement>;
};

const CommentInput: React.FC<CommentInputProps> = ({
  handleAddComment,
  loading,
  setComment,
}) => {
  return (
    <Stack>
      <Divider width="100%" color="gray.300" border="1px solid" />
      <form onSubmit={handleAddComment}>
        <Flex justify="space-between" align="center">
          <Input
            type="text"
            onChange={(e) => setComment(e.target.value)}
            mb={2}
            _focus={{
              border: "0px solid",
              borderColor: "red",
              bg: "white",
              boxShadow: "0 0 0px 1000px #FFFFFF inset",
            }}
            border="0px solid"
            borderColor="transparent"
            bg="white"
            placeholder="Add a comment..."
          />
          <Button
            isLoading={loading}
            _hover={{ background: "white" }}
            type="submit"
          >
            <Text
              m={2}
              mt={0}
              fontWeight={600}
              cursor="pointer"
              onClick={() => {}}
              color="blue.500"
            >
              Post
            </Text>
          </Button>
        </Flex>
      </form>
    </Stack>
  );
};
export default CommentInput;
