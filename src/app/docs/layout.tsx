export default ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full">
      <div className="h-full max-w-4xl mx-auto py-20 px-4">
        {children}
      </div>
    </div>
  );
};
