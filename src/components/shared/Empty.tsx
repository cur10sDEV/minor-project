import Image from "next/image";

const Empty = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 center">
      <Image
        src="/empty-folder.png"
        alt="Nothing found"
        width={300}
        height={300}
      />
      <h2 className="text-2xl font-semibold">Empty</h2>
      <p className="text-lg">There&apos;s nothing here. Please check again.</p>
    </div>
  );
};
export default Empty;
