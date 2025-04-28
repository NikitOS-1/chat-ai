import "./style.scss"
import {ReactComponent as SendIcon} from '../../assets/icons/graphic_eq.svg?react';

interface ButtonProps {
    onClick: () => void;
    isLoading?: boolean;
}

export const Button = ({onClick, isLoading}: ButtonProps) => {
    return (
        <button className="button" onClick={onClick} disabled={isLoading}>
            <div className="icon-wrapper">
                {isLoading ? (
                    <div className="spinner"/>
                ) : (
                    <SendIcon className="send-icon"/>
                )}
            </div>
        </button>
    );
}