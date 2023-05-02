export interface IButton<T>
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    clickEvent?: () => void;
    getState?: T;
    action?: string;
}
