export default function Loading() {
  return (
    <div className="flex w-full h-full fixed top-0 left-0 bg-white justify-center items-center opacity-75 z-50">
      <div
        className="animate-spin inline-block size-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}