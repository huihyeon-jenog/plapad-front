import Slider from "@/components/Notebooks/Slider";

export default async function Page() {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        Notebooks
      </h2>
      <div>
        <Slider />
      </div>
    </div>
  )
}