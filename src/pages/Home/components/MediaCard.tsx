import { Link, Stack, Card, CardMedia, Typography, CardContent, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {
    AccessTimeFilledRounded,
    People,
    Verified,
    LaunchRounded,
    LocationOnRounded,
    PlayCircleFilledRounded,
} from '@mui/icons-material';
import { SDSChip } from 'components/ui/chip';
import { SDSColorPrimitives, SDSColorsSemantic } from 'components/ui/Colours';
import { EventInformation, MediaInformation } from 'types/Media';
import schelloStudentImg from 'assets/images/characters/student.png';
import schelloAdminImg from 'assets/images/characters/admin.png';
import schelloExciseImg from 'assets/images/characters/excise.png';
import schelloNewsImg from 'assets/images/characters/news.png';
import { removeHtmlTags, formatTimestamp } from 'util/media';

import dayjs from 'dayjs';
import ROUTES from 'routes';

const backgroundColors = [
    SDSColorsSemantic.brandPrimary,
    SDSColorsSemantic.brandSecondary,
    SDSColorsSemantic.brandTertiary,
];

export default function MediaCard(props: {
    data: MediaInformation | EventInformation;
    expand?: boolean;
    index: number;
    grow?: boolean;
    page: string;
}) {
    const displayTime = {
        startDate:
            'date_from' in props.data ? dayjs(props.data.date_from).format('D MMM YYYY') : '',
        endDate: 'date_to' in props.data ? dayjs(props.data.date_to).format('D MMM YYYY') : '',
        startTime: 'time_from' in props.data ? dayjs(props.data.time_from).format('hh:mm A') : '',
        endTime: 'time_to' in props.data ? dayjs(props.data.time_to).format('hh:mm A') : '',
    };

    const displayTimeDateString =
        displayTime.startDate !== displayTime.endDate
            ? `${displayTime.startTime}, ${displayTime.startDate} → ${displayTime.endTime}, ${displayTime.endDate}`
            : `${displayTime.startDate}, ${displayTime.startTime} → ${displayTime.endTime}`;

    const descriptionLimit = 250;

    function truncateString(str: string, limit: number): string {
        if (str.length > limit) {
            return str.slice(0, limit) + '...';
        } else {
            return str;
        }
    }

    const expand = props.expand ?? true;

    const description: string = truncateString(
        removeHtmlTags(props.data.description ?? ''),
        descriptionLimit
    );

    return (
        <Card
            sx={{
                width: expand ? '100%' : '320px',
                minWidth: '230px',
                flexShrink: 1,
                flexGrow: 1,
                // height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {props.data.type === 'MEDIA' && props.data.media_type === 'VIDEO' && (
                <Link
                    href={'url' in props.data ? props.data.url : undefined}
                    target="_blank"
                    sx={{ textDecoration: 'none' }}
                >
                    <CardMedia
                        sx={{
                            height: expand ? 245 : 120,
                            width: '100%',
                            position: 'relative',
                        }}
                        image={props.data.thumbnail}
                    >
                        <PlayCircleFilledRounded
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: 64,
                                color: 'rgba(255, 255, 255, 0.8)',
                                zIndex: 1,
                                cursor: 'pointer',
                            }}
                        />
                    </CardMedia>
                </Link>
            )}

            <CardContent
                sx={{
                    height: '100%',
                    width: '100%',
                    rowGap: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: SDSColorPrimitives.bloodyBlue,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {props.data.title}
                </Typography>

                <Stack
                    direction={'row'}
                    gap={'12px'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    sx={{ width: '100%' }}
                >
                    <div
                        style={{
                            height: '20px',
                            display: 'flex',
                            columnGap: '12px',
                            minWidth: 0,
                            flexShrink: 1,
                        }}
                    >
                        <div
                            style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundImage: `url(${
                                    props.data.type === 'MEDIA' && props.data.media_type === 'NEWS'
                                        ? schelloNewsImg
                                        : props.data.fromExcise
                                        ? schelloExciseImg
                                        : props.data.type === 'EVENT'
                                        ? schelloAdminImg
                                        : schelloStudentImg
                                })`,
                                backgroundColor: backgroundColors[props.index % 3],
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                border: '1px solid #00000032',
                                flex: '0 0 auto',
                            }}
                        ></div>
                        <Typography
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                flexShrink: 1,
                                maxWidth: '100%',
                                minWidth: '0px',
                            }}
                        >
                            {props.data.source ?? 'UNDEFINED'}{' '}
                            {props.data.type === 'MEDIA' && props.data.media_type === 'NEWS'
                                ? ' (News)'
                                : ''}
                        </Typography>
                    </div>

                    <SDSChip
                        sx={{ flexShrink: 0 }}
                        label={props.data.fromExcise ? 'Excise' : 'Community'}
                        color={props.data.fromExcise ? 'primary' : 'secondary'}
                        icon={props.data.fromExcise ? <Verified /> : <People />}
                    ></SDSChip>
                </Stack>

                <Typography variant="body2" color="text.secondary" style={{ maxLines: 3 }}>
                    {description.length > 0 ? description : 'No description available'}
                </Typography>

                <div style={{ flex: 1 }}></div>

                <Stack
                    justifyContent={'space-between'}
                    direction={'row'}
                    flexWrap={'wrap'}
                    rowGap={'12px'}
                    sx={{ display: 'flex' }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        gap={'8px'}
                        flexWrap={'wrap'}
                        sx={{ maxWidth: '100%', textOverflow: 'ellipsis' }}
                    >
                        <Stack direction="row" alignItems="center" justifyContent="center">
                            <AccessTimeFilledRounded />
                            <p style={{ fontSize: '0.8em', margin: '0', padding: '0px 5px' }}>
                                {props.data.type === 'MEDIA'
                                    ? formatTimestamp(props.data.timestamp)
                                    : displayTimeDateString}
                            </p>
                        </Stack>

                        {props.data.type === 'EVENT' && props.data.venue !== undefined && (
                            <Stack direction="row" alignItems="center" justifyContent="center">
                                <LocationOnRounded />
                                <a
                                    style={{
                                        fontSize: '0.8em',
                                        margin: '0',
                                        padding: '0px 5px',
                                    }}
                                    href={props.data.venue}
                                >
                                    {props.data.venue}
                                </a>
                            </Stack>
                        )}
                    </Stack>

                    {props.data.type === 'MEDIA' &&
                        (props.data.media_type === 'ARTICLE' ||
                            props.data.media_type === 'NEWS') && (
                            <NavLink
                                target={props.data.redirect ? '_blank' : undefined}
                                to={
                                    props.data.redirect
                                        ? props.data.url!
                                        : ROUTES.ARTICLE.replace(':id', props.data.id)
                                }
                                state={{
                                    data: props.data,
                                    fromPage: props.page,
                                    profileColor: backgroundColors[props.index % 3],
                                }}
                            >
                                <Button
                                    startIcon={<LaunchRounded />}
                                    size="small"
                                    variant="contained"
                                >
                                    Continue Reading
                                </Button>
                            </NavLink>
                        )}

                    {props.data.type === 'EVENT' && (
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            style={{ width: '100%' }}
                        >
                            <SDSChip
                                label={props.data.mode}
                                icon={props.data.mode === 'OFFLINE' ? <Verified /> : <People />}
                            ></SDSChip>

                            {props.data.register_url !== null && (
                                <Button
                                    startIcon={<LaunchRounded />}
                                    size="small"
                                    variant="contained"
                                    href={props.data.register_url}
                                >
                                    Register Now
                                </Button>
                            )}
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
