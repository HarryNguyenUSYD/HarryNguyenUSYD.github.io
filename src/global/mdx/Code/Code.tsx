export default function Code({ children }: { children: string }) {
  return (
    <code className="bg-gray-200 dark:bg-gray-800 rounded px-1 py-0.5 text-sm lg:text-xl text-gray-200 break-all">
        {children}
    </code>
  );
}