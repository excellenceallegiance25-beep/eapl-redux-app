import { Box, CssBaseline } from "@mui/material";
import ChatBotWidget from "../chatbot/ChatBotWidget";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}

        <ChatBotWidget />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
