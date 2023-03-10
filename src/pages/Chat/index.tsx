import "./index.css";
import { useState, useRef, useEffect } from "react";
import { sendUserChat } from "../../api/chat";
import { Stack } from "@mui/system";
import {
  Button,
  Card,
  CardContent,
  InputBase,
  List,
  Typography,
} from "@mui/material";
import stringToHtml from "html-react-parser";
import Notification from "components/Notification";
type MessageData = { user: string; message: string };

const USER = {
  AI: "AI",
  HUMAN: "USER",
};

const BASE_MESSAGE = `The following is a conversation with an AI Substance Abuse Counselor and a ${USER.HUMAN}. The ${USER.AI} is helpful, creative, clever, empathetic and very friendly. ${USER.AI}'s objective is counsel the ${USER.HUMAN}.`;

const ChatMessage = ({ message }: { message: MessageData }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded(!expanded);

  const isAi = message.user === USER.AI;

  return (
    <Card
      variant="outlined"
      onClick={handleExpand}
      style={{
        padding: "10px",
        margin: "20px",
        maxWidth: "400px",
        minHeight: "max-content",
        float: isAi ? "left" : "right",
        clear: "both",
      }}
      className={isAi ? "bg-blue" : "bg-user-color"}
    >
      <CardContent style={{ padding: "8px" }}>
        {stringToHtml(message.message.replace("\n", "<br>"))}
      </CardContent>
    </Card>
  );
};

function ChatPage() {
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    show: false,
  });
  const [chatLog, setChatLog] = useState([
    {
      user: USER.AI,
      message:
        "Hello, I am your AI Substance Abuse Counselor. How can I help you?",
    },
  ]);
  const chatRef = useRef<HTMLOListElement>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (input === "") return;

    const messageData = [...chatLog, { user: USER.HUMAN, message: input }];

    setInput("");
    setChatLog(messageData);

    setIsLoading(true);

    try {
      const { data, error } = await sendUserChat({
        message: [
          BASE_MESSAGE,
          ...messageData.map((e) => `${e.user}:${e.message}`),
          `${USER.AI}:`,
        ].join(" "),
      });

      if (error) throw new Error(data);
      setChatLog([...messageData, { user: USER.AI, message: data }]);
    } catch (error: any) {
      setNotification({ message: error.message, show: true });
    }

    setIsLoading(false);
  }

  function handleClick() {
    setShowWelcomeMsg(false);
    setShowChat(true);
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        behavior: "smooth",
        top: chatRef.current.scrollHeight,
      });
    }
  }, [chatLog]);

  return (
    <Stack>
      {showWelcomeMsg && (
        <Stack alignItems="center" justifyContent="center" margin={3}>
          <Stack alignItems="center" marginBottom={4}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              Substance Abuse Counseling Bot
            </Typography>
          </Stack>
          <Typography variant="h6">
            This is a personalized health app designed specially for clarifying
            your doubts regarding your substance abuse related queries.
          </Typography>
          <Typography variant="h6" style={{ color: "red" }}>
            We respect your privacy. The chats wont be saved and you don't need
            to reveal your personal details to use this personalized app.
          </Typography>
          <Button
            variant="contained"
            style={{ minWidth: "40vw", margin: "30px" }}
            onClick={() => handleClick()}
          >
            Click here to start a conversation
          </Button>
        </Stack>
      )}

      {showChat && (
        <Stack>
          <List
            style={{
              overflow: "auto",
              padding: "0px",
              maxHeight: "75vh",
              minHeight: "20px",
            }}
            ref={chatRef}
          >
            {chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </List>

          <Card
            style={{
              padding: "10px",
              margin: 0,
              bottom: 0,
              minHeight: "4rem",
              position: "fixed",
              width: "100%",
              borderRadius: 0,
              backgroundColor: notification.show ? "#f04d38" : "#f1c043",
            }}
          >
            <form onSubmit={handleSubmit}>
              <InputBase
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Provide your query message here"
                fullWidth
                multiline
                style={{ padding: "10px" }}
                onKeyDown={(e: any) => {
                  if (e.keyCode === 13 && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}
              />
            </form>
          </Card>
        </Stack>
      )}
      <Notification
        showMessage={notification}
        setShowMessage={setNotification}
      />
    </Stack>
  );
}

export default ChatPage;
