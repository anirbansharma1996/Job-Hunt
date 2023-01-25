import { useColorMode, ColorModeProvider } from "@chakra-ui/react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
export function Color() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <ColorModeProvider value={colorMode}>
      <button onClick={toggleColorMode}>
        {colorMode == "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
      </button>
    </ColorModeProvider>
  );
}
