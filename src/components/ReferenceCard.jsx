export default function ReferenceCard({ title, note, images = [], onOpen }) {
  return (
    <div className="rounded-xl overflow-hidden shadow bg-white dark:bg-gray-800">
      {/* ✔️ Az első kép jelenik meg előnézetként */}
      <img
        src={images[0]}
        alt={title}
        className="w-full h-64 object-cover cursor-pointer"
        onClick={() => onOpen(images)}
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{note}</p>
      </div>
    </div>
  );
}
