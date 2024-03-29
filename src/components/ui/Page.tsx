import { SDSColorsSemantic } from './Colours';

type Props = {
    children: string | JSX.Element | JSX.Element[];
    padding?: string | undefined;
    scroll?: boolean;
};

export default function Page({ children, padding, scroll }: Props) {
    return (
        <div
            style={{
                padding: padding ?? '100px 0px 0px 0px',
                backgroundColor: SDSColorsSemantic.background,
                minHeight: '100vh',
                overflow: scroll ?? true ? 'scroll' : 'hidden',
                height: scroll ?? true ? undefined : '100vh',
                position: 'relative',
            }}
        >
            {children}
        </div>
    );
}
