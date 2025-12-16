import Link from 'next/link';
import { ReactNode, CSSProperties } from 'react';

interface ButtonProps {
    children: ReactNode;
    href?: string;
    variant?: 'primary' | 'outline';
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    style?: CSSProperties;
}

export default function Button({
    children,
    href,
    variant = 'primary',
    onClick,
    className = '',
    type = 'button',
    style
}: ButtonProps) {
    const baseClass = `btn btn-${variant} ${className}`;

    if (href) {
        return (
            <Link href={href} className={baseClass} style={style}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={baseClass} onClick={onClick} style={style}>
            {children}
        </button>
    );
}
