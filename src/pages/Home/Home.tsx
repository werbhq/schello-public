import { Grid, List, ListItem, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NoDataCard from './components/NoDataCard';
import MediaCard from './components/MediaCard';
import { useGeneralData } from 'hooks/useGeneralData';
import PageLoader from 'components/ui/PageLoader';
import Page from 'components/ui/Page';
import { SDSColorsSemantic } from 'components/ui/Colours';
import { useCommunityData } from 'hooks/useCommunityData';
import { Add } from '@mui/icons-material';
import useCheckMobileScreen from 'hooks/useMobile';
import ROUTES from 'routes';

function HomePage() {
    const { events, videos, news, isLoading } = useGeneralData();
    const { videos: communityVideos, articles, isLoading: isLoadingCommunity } = useCommunityData();

    const isMobile = useCheckMobileScreen();

    if (isLoading || isLoadingCommunity) return <PageLoader loading={isLoading} />;

    const mediaList = [
        ...(videos ?? []),
        ...(news ?? []),
        ...(communityVideos ?? []),
        ...(articles ?? []),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <Page padding="64px 0px 0px 0px" scroll={false}>
            {isMobile ? (
                <Button
                    component={Link}
                    to={ROUTES.COMMUNITY_FORM}
                    style={{
                        position: 'absolute',
                        height: '80px',
                        width: '80px',
                        borderRadius: '50%',
                        bottom: '40px',
                        right: '40px',
                        border: '1px solid rgba(199, 173, 165, 0.50)',
                        // background: SDSColorsSemantic.brandPrimary,
                        zIndex: 999,
                        cursor: 'pointer',
                    }}
                >
                    <Add />
                </Button>
            ) : (
                <></>
            )}

            <Grid container style={{ overflow: 'hidden', height: '100%', padding: '16px' }}>
                <Grid item lg xs></Grid>
                <Grid
                    item
                    xs={12}
                    sm={5}
                    md={7}
                    lg={7}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                        overflow: 'scroll',
                    }}
                >
                    <Stack spacing={2}>
                        <Stack padding={'64px 0px 24px 0px'} sx={{ zIndex: 999 }}>
                            <Typography variant="h3">Welcome to Schello!</Typography>
                        </Stack>

                        <Stack
                            component={Link}
                            to={isMobile ? '' : '/community/form'}
                            sx={{
                                borderRadius: '16px',
                                border: '1px solid rgba(199, 173, 165, 0.50)',
                                background: SDSColorsSemantic.surface,
                                boxShadow:
                                    '0px 4px 50px 0px rgba(64, 93, 136, 0.04), 0px -80px 0px 40px #F5F0EC',
                                padding: '16px',
                                textDecoration: 'none',
                                marginBottom: '160px',
                                position: 'sticky',
                                top: '0px',
                                zIndex: 998,
                                //TODO: Use hover effect to migrate from multiple forms to one linked form

                                // transitionDuration: '0.2s',
                                // height: 'min-content',

                                // '&:hover': {
                                //     borderRadius: '16px',
                                //     transitionDuration: '0.6s',
                                //     paddingBottom: '120px',

                                // },
                            }}
                        >
                            <Typography variant="h5">
                                {isMobile
                                    ? 'Want to report an incident?'
                                    : 'Got something to share?'}
                            </Typography>
                            <Typography>
                                {isMobile
                                    ? 'Feel free to report a drug related incident, completely anonymously'
                                    : 'Click here to share a video or article you feel would be helpful to others.'}
                            </Typography>
                            <br />
                            {isMobile ? (
                                <Button component={Link} to={ROUTES.DRUG_FORM}>
                                    Report Anonymously
                                </Button>
                            ) : (
                                <></>
                            )}
                        </Stack>

                        <List
                            style={{
                                gap: 12,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100% !important',
                                padding: 0,
                                marginTop: 24,
                                marginBottom: 120,
                            }}
                        >
                            {mediaList?.map((e, index) => (
                                <MediaCard data={e} key={index} index={index} page="Home" />
                            ))}
                        </List>
                    </Stack>
                </Grid>
                <Grid item lg xs></Grid>

                <Grid
                    item
                    xs={5}
                    sm={0}
                    md={3}
                    lg={3}
                    sx={{
                        borderRadius: ' 10px',
                        border: '1px solid rgba(199, 173, 165, 0.50)',
                        background: SDSColorsSemantic.surface,
                        padding: '16px',
                        boxSizing: 'border-box',
                        height: '100%',
                        overflow: 'scroll',
                    }}
                >
                    <Typography variant="h6">Latest Events</Typography>
                    <List
                        style={{
                            overflow: 'auto',
                            padding: '0px',
                            marginTop: '16px',
                        }}
                    >
                        {events?.map((e, index) => (
                            <ListItem
                                key={index}
                                style={{
                                    padding: '5px 0px',
                                }}
                            >
                                <MediaCard data={e} key={index} index={index} page="Home" />
                            </ListItem>
                        ))}
                        {events?.length === 0 && <NoDataCard resource="events" />}
                    </List>
                </Grid>
            </Grid>
        </Page>
    );
}

export default HomePage;
