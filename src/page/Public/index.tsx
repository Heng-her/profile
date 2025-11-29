import viteLogo from '../../assets/tiger.svg'
export default function PublicPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1>Public Page</h1>
      <p>This is a public page accessible to all users.</p>
      <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <img
          className="size-12 shrink-0"
          src={viteLogo}
          alt="ChitChat Logo"
        />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore temporibus, aliquid molestias iste eaque expedita eum voluptatem harum minus? Officia nam maiores praesentium, laborum rem ut facilis porro quos perspiciatis?
        <div>
          <div className="text-xl font-medium text-black dark:text-white">
            ChitChat
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            You have a new message!
          </p>
        </div>
      </div>
    </div>
  );
}
