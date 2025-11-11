import React from 'react';

// FIX: Use a discriminated union to avoid type conflicts between anchor and button attributes.
// The component can be either a link (with href) or a button (without href), but not both.
type BaseProps = {
  icon: React.ReactNode;
  text: string;
};

type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ActionButtonProps = AnchorProps | ButtonProps;


const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const commonClasses = "w-full flex items-center justify-center p-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-400 shadow-lg";

  // FIX: Check for the 'href' prop to determine whether to render an `<a>` or `<button>`.
  // This acts as a type guard for the discriminated union `ActionButtonProps`.
  if (props.href) {
    const { icon, text, ...anchorProps } = props;
    return (
      <a className={commonClasses} {...anchorProps}>
        <span className="w-6 h-6 mr-3">{icon}</span>
        <span>{text}</span>
      </a>
    );
  }

  const { icon, text, ...buttonProps } = props;
  return (
    <button className={commonClasses} {...buttonProps}>
      <span className="w-6 h-6 mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default ActionButton;
