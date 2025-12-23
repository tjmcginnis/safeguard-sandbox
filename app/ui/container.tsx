type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`border border-r-8 border-b-8 border-gray-200 rounded-lg dark:border-white/5 dark:bg-neutral-900 ${className}`}
    >
      {children}
    </div>
  );
}
