import { Chip, SxProps } from '@mui/material';

interface SDSChipProps {
    label: string;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
    size?: 'small' | 'medium' | undefined;
    variant?: 'filled' | 'outlined' | undefined;
    icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    sx?: SxProps;
    onClick?: () => void;
}

export const SDSChip = (props: SDSChipProps) => {
    const { label, color, size, variant, icon, onClick, sx } = props;
    return (
        <Chip
            label={label}
            color={color}
            size={size}
            variant={variant}
            icon={icon}
            onClick={onClick}
            sx={{ borderRadius: 6, border: '1px #00000010 solid', ...sx }}
        />
    );
};
