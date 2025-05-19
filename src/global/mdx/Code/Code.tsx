export default function Code({ code }: { code: string }) {
  return (
    <code className="bg-gray-200 dark:bg-gray-800 rounded px-1 py-0.5 text-xl text-gray-200">
        {code}
    </code>
  );
}