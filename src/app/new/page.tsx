import SearchIcon from "@/components/SearchIcon/SearchIcon";

export default function NewTaskPage() {

  return (
    <div className="flex justify-center w-full">
      <form action="#" className="space-y-4 max-w-2xl w-full bg-green-300 p-10 rounded-lg shadow-lg">
        <div>
          <label className="sr-only" htmlFor="name">Task name</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Grocery"
            type="text"
            id="name"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="name">Task title</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Pnp Shop"
            type="text"
            id="title"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="email">Description</label>
          <textarea
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Buy stuff for three meals. Do it before 5pm today"
            id="description"
            rows={8}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <div>
            <label
              htmlFor="Option1"
              className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
              tabIndex={0}
            >
              <input className="sr-only" id="small" type="radio" tabIndex={-1} name="option"/>

              <span className="text-sm">Small</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="Option2"
              className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
              tabIndex={0}
            >
              <input className="sr-only" id="medium" type="radio" tabIndex={-1} name="option"/>

              <span className="text-sm">Medium</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="Option3"
              className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
              tabIndex={0}
            >
              <input className="sr-only" id="large" type="radio" tabIndex={-1} name="option"/>

              <span className="text-sm">Large</span>
            </label>
          </div>
        </div>

        <label className="sr-only" htmlFor="search">Description</label>
        <SearchIcon/>

        <div className="mt-4">
          <button
            type="submit"
            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
          >
            Send Enquiry
          </button>
        </div>
      </form>
    </div>)
}
