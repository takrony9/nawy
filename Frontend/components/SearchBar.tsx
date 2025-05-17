interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by unit number, project name, or title"
      className="w-full p-2 border rounded-md shadow-sm text-black placeholder:text-gray-500"
    />
  );
}
