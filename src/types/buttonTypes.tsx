export interface IButton<T> extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    clickEvent?: (() => void) | ((prod_id: string) => void);
    getState?: T;
}
