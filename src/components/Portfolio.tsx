import { useResponsive } from "../util/responsive";
export default function Portfolio({
  projects,
}: {
  projects: { title: string; desc: string; img: string }[];
}) {
  const { isMobile, isDesktop } = useResponsive();
  return (
    <>
      <div className={`${isDesktop ? "block" : "hidden"}`}>
        <h3 className="text-lg font-bold mb-2">Portfolio</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <div
                className="aspect-video w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${project.img}')` }}
              ></div>
              <div className="p-4">
                <h4 className="font-semibold">{project.title}</h4>
                <p className="text-sm text-[#617589] dark:text-gray-400">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${isMobile ? "block" : "hidden"}`}>
        <h3 className="text-lg font-bold mb-2">Portfolio</h3>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {projects.map((project) => (
            <div key={project.title} className="shrink-0 w-64 space-y-2">
              <div
                className="aspect-video w-full bg-cover bg-center rounded"
                style={{ backgroundImage: `url('${project.img}')` }}
              ></div>
              <h4 className="font-semibold">{project.title}</h4>
              <p className="text-sm text-[#617589] dark:text-gray-400">
                {project.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
