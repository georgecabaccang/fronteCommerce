export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    clickEvent?: () => void;
    getStateString?: string;
    getStateNumber?: number;
}
