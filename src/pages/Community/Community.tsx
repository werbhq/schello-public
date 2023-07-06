import { Typography, List, Stack, Grid } from '@mui/material';
import PageLoader from 'components/ui/PageLoader';
import { useCommunityData } from 'hooks/useCommunityData';
import Page from 'components/ui/Page';
import SearchBar from 'components/ui/SearchBar';
import { useState } from 'react';
import { CommunityArticle, CommunityVideo } from 'types/Community';
import NoDataCard from './components/NoDataCard';
import { MediaInformation } from 'types/Media';
import MediaCard from 'pages/Home/components/HomeCard';
import { SDSChip } from 'components/ui/chip';

function CommunityPage() {
    const { videos, articles, isLoading } = useCommunityData();
    const [search, setSearch] = useState('');

    if (isLoading) return <PageLoader loading={isLoading} />;

    const onSearchChange = (e: any) => setSearch(e.target.value.toLocaleLowerCase());

    const filterSearch = (
        e: CommunityVideo | CommunityArticle | MediaInformation,
        search: string
    ) => {
        if (search.length > 2) {
            return (
                e.title.toLocaleLowerCase().includes(search) ||
                e.description?.toLocaleLowerCase().includes(search) ||
                ('author' in e && e.author?.toLocaleLowerCase().includes(search)) ||
                ('source' in e && e.source?.toLocaleLowerCase().includes(search)) ||
                e.email?.toLocaleLowerCase().includes(search)
            );
        }
        return true;
    };

    return (
        <Page padding="64px 0px 0px 0px" scroll={false}>
            <Grid
                container
                style={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    height: '100%',
                    width: '100%',
                    padding: '0px 16px 0px 16px',
                }}
            >
                <Grid item xs sm md lg></Grid>
                <Grid item xs={12} sm={10} md={10} lg={10}>
                    <Stack
                        spacing={4}
                        alignItems="start"
                        justifyContent="center"
                        sx={{ width: '100%', paddingTop: '64px' }}
                    >
                        <Typography variant="h3">Library</Typography>
                        <Stack direction={'row'}>
                            <SearchBar placeholder="Search" onChange={onSearchChange} />
                            <Stack direction={'row'}>
                                <SDSChip label="Videos"></SDSChip>
                                <SDSChip label="Articles"></SDSChip>
                                <SDSChip label="News"></SDSChip>
                                <SDSChip label="Events"></SDSChip>
                            </Stack>
                        </Stack>

                        <Stack spacing={2} sx={{ width: '100%', overflow: 'auto' }}>
                            <Typography variant="h4">Videos</Typography>
                            <List
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    columnGap: '12px',
                                }}
                            >
                                {videos
                                    ?.filter((e) => filterSearch(e, search))
                                    .map((e, index) => (
                                        <MediaCard
                                            data={e}
                                            expand={false}
                                            key={index}
                                            index={index}
                                        />
                                    ))}

                                {videos?.filter((e) => filterSearch(e, search)).length === 0 && (
                                    <NoDataCard resource="videos" />
                                )}
                            </List>
                        </Stack>

                        <Stack spacing={2}>
                            <Typography variant="h4">Articles</Typography>
                            <List
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    columnGap: '12px',
                                    overflow: 'auto',
                                    width: '100%',
                                }}
                            >
                                {articles
                                    ?.filter((e) => filterSearch(e, search))
                                    .map((e, index) => (
                                        <MediaCard
                                            data={e}
                                            expand={false}
                                            key={index}
                                            index={index}
                                        />
                                    ))}
                                {articles?.filter((e) => filterSearch(e, search)).length === 0 && (
                                    <NoDataCard resource="articles" />
                                )}
                            </List>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs sm md lg></Grid>
            </Grid>
        </Page>
    );
}

export default CommunityPage;
