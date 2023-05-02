export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    clickEvent: () => void;
}
