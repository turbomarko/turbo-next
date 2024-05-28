export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <div className="mx-auto h-full max-w-4xl px-4 py-20">{children}</div>
    </div>
  );
};
