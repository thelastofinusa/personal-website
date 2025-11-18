import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

import { Wrapper } from "@/components/wrapper";
import { ProjectCard } from "@/components/project-card";
import { dummyProjects } from "@/lib/constants";

export const FeaturedProjects = () => {
  return (
    <div className="py-12 sm:py-16 md:py-[100px]">
      <Wrapper className="flex flex-col gap-4 md:gap-6">
        <Link href="/works" className="group flex w-max items-center gap-1">
          <span className="font-mono text-sm uppercase">Explore Projects</span>
          <FiChevronRight className="size-4 transition duration-200 ease-out group-hover:translate-x-1" />
        </Link>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dummyProjects
            .filter((item) => item.featured)
            .map((item, index) => (
              <ProjectCard key={item.name ?? index} {...item} />
            ))}
        </div>
      </Wrapper>
    </div>
  );
};
