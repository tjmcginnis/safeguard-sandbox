type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Header({ children, className = "" }: HeaderProps) {
  return (
    <p
      className={`inset-x-px space-x-3 border-b border-gray-200 p-2 sm:px-3 dark:border-white/10 ${className}`}
    >
      {children}
    </p>
  );
}
