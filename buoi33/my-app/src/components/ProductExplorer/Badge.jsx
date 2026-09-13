export default function Badge({ text, type }) {
  const bgColor = type === 'discount' ? 'bg-red-500' : 'bg-slate-800';
  return (
    <div className={`absolute top-2 right-2 px-2 py-1 ${bgColor} text-white text-xs font-bold rounded shadow-sm z-10`}>
      {text}
    </div>
  );
}
