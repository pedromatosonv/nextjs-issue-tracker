import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) {
    return null;
  }

  return (
    <Text color="red" size="1">
      {children}
    </Text>
  );
}
