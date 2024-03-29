import { useState, useRef, useEffect } from 'react';
import { sendUserChat } from '../../api/chat';
import { Stack } from '@mui/system';
import { Button, Card, InputBase, List, Typography, Grid } from '@mui/material';
import Notification from 'components/Notification';
import SendIcon from '@mui/icons-material/Send';
import ChatMessage from './components/ChatMessage';
import { ChatCompletionRequestMessage, ChatCompletionRoleEnum } from 'types/OpenAi';
import LoadingMessage from './components/LoadingMessage';
import Page from 'components/ui/Page';

function ChatPage() {
    const [input, setInput] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [showWelcomeMsg, setShowWelcomeMsg] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        message: '',
        show: false,
    });
    const [chatLog, setChatLog] = useState<ChatCompletionRequestMessage[]>([
        {
            role: ChatCompletionRoleEnum.Assistant,
            content: 'Hello, I am your AI Substance Abuse Counselor. How can I help you?',
        },
    ]);
    const chatRef = useRef<HTMLOListElement>(null);

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (input === '') return;

        const messageData = [...chatLog, { role: ChatCompletionRoleEnum.User, content: input }];

        setInput('');
        setChatLog(messageData);

        setIsLoading(true);

        try {
            const { data, error } = await sendUserChat(messageData);

            if (error) throw new Error(data);
            setChatLog([...messageData, { role: ChatCompletionRoleEnum.Assistant, content: data }]);
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
                behavior: 'smooth',
                top: chatRef.current.scrollHeight,
            });
        }
    }, [chatLog]);

    const styleProps = showWelcomeMsg
        ? { marginY: 4, spacing: 4, alignItems: 'center', justifyContent: 'centre' }
        : {};

    return (
        <Page>
            <Stack>
                {showWelcomeMsg && (
                    <Grid container>
                        <Grid item xs sm md lg></Grid>
                        <Grid item xs={12} sm={10} md={10} lg={8}>
                            <Stack {...styleProps} padding={'0px 16px'}>
                                <Stack alignItems="center" justifyContent="center">
                                    <Stack alignItems="center" marginBottom={4}>
                                        <Typography variant="h3">Talk to Wellness Bot</Typography>
                                    </Stack>
                                    <Stack gap={'16px'}>
                                        <Typography variant="h6">
                                            Wellness Bot is your confidential and personalised
                                            substance-abuse counseling bot. Here's what you need to
                                            know:
                                        </Typography>

                                        <Stack
                                            sx={{
                                                borderRadius: '10px',
                                                border: '1px solid rgba(199, 173, 165, 0.50)',
                                                background: '#FFF',
                                                boxShadow:
                                                    '0px 4px 50px 0px rgba(64, 93, 136, 0.04)',
                                            }}
                                        >
                                            <div>
                                                <ol>
                                                    <li>
                                                        <b>Privacy:</b>Your conversations are
                                                        completely confidential, and we respect your
                                                        privacy.
                                                    </li>
                                                    <li>
                                                        <b>Anonymous Support:</b> No personal
                                                        details are required to use the app.
                                                    </li>
                                                    <li>
                                                        <b>Get Answers:</b> The bot is here to help
                                                        clarify your substance abuse-related
                                                        queries.
                                                    </li>
                                                    <li>
                                                        <b>Disclaimer:</b> The bot provides general
                                                        information and is not a substitute for
                                                        professional advice. Consult a healthcare
                                                        professional for personalized guidance.
                                                    </li>
                                                </ol>
                                            </div>
                                        </Stack>
                                        <Typography variant="h6">
                                            By proceeding, you acknowledge that you've read and
                                            understood the above information.
                                        </Typography>
                                    </Stack>
                                    <br />

                                    <Button
                                        variant="contained"
                                        style={{}}
                                        onClick={() => handleClick()}
                                    >
                                        Start a conversation!
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs sm md lg></Grid>
                    </Grid>
                )}
                {showChat && (
                    <Stack>
                        <Stack>
                            <List
                                style={{
                                    overflow: 'auto',
                                    padding: '0px',
                                    maxHeight: '75vh',
                                    paddingBottom: '32px',
                                    minHeight: '20px',
                                }}
                                ref={chatRef}
                            >
                                {chatLog.map((message, index) => (
                                    <ChatMessage key={index} message={message} />
                                ))}
                                {isLoading && <LoadingMessage />}
                            </List>

                            <Card
                                style={{
                                    // padding: '10px',
                                    margin: 0,
                                    bottom: 0,
                                    minHeight: '16%',
                                    position: 'fixed',
                                    width: '100vw',
                                    borderRadius: 0,
                                    backgroundColor: notification.show ? '#f04d38' : '#fff',
                                }}
                            >
                                <form onSubmit={handleSubmit}>
                                    <InputBase
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Provide your query message here"
                                        fullWidth
                                        multiline
                                        style={{ padding: '10px', backgroundColor: '#fff' }}
                                        onKeyDown={(e: any) => {
                                            if (e.keyCode === 13 && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmit(e);
                                            }
                                        }}
                                        disabled={isLoading}
                                    />
                                    <Stack flexDirection={'row-reverse'}></Stack>
                                    <Button
                                        sx={{
                                            float: 'right',
                                            right: '16px',
                                            bottom: '16px',
                                        }}
                                        endIcon={
                                            <SendIcon
                                                style={{
                                                    color: 'white',
                                                    fontSize: '30px',
                                                }}
                                            />
                                        }
                                        onClick={handleSubmit}
                                        type="submit"
                                    />
                                </form>
                            </Card>
                        </Stack>

                        <Notification showMessage={notification} setShowMessage={setNotification} />
                    </Stack>
                )}
            </Stack>
        </Page>
    );
}

export default ChatPage;
