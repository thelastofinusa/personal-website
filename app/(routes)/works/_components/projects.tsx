import { Heading } from "@/components/heading";
import { ProjectCard } from "@/components/project-card";
import { Wrapper } from "@/components/wrapper";
import { dummyProjects } from "@/lib/constants";

export const ProjectSection = () => {
  return (
    <div className="py-12 sm:py-16 md:py-[100px]">
      <div className="flex flex-col gap-6 md:gap-10 lg:gap-16">
        <Wrapper>
          <Heading
            title="Works"
            description="Selected clients projects from the past years."
          />
        </Wrapper>

        <Wrapper
          size={"lg"}
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {dummyProjects.map((item, index) => (
            <ProjectCard key={index} {...item} />
          ))}
        </Wrapper>
      </div>
    </div>
  );
};
