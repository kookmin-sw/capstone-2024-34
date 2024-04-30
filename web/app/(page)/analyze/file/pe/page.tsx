export default function AnalyzePeFilePage() {
  return (
    <div>
      <div>
        <form className="max-w-sm">
          <label htmlFor="file-input" className="sr-only">
            Choose file
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            className="block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4 file:py-3
    focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50
   "
          />
        </form>
      </div>
    </div>
  );
}
