import Link from "next/link";
import type { Project } from "#velite";
import { ImageFrame } from "@/components/image-frame";

export function ProjectCard({ project, withImage = false }: { project: Project; withImage?: boolean }) {
  return (
    <Link href={`/work/${project.slug}`} style={{ color: "inherit" }}>
      <div className="card h-full box-border">
        {withImage && (
          <div style={{ marginBottom: 11.2 }}>
            <ImageFrame
              src={project.image}
              alt={project.title}
              aspectRatio="16 / 10"
              placeholder="Screenshot"
            />
          </div>
        )}
        <span className="card-kicker">
          {project.year} · {project.kicker}
        </span>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-body">{project.summary}</p>
        {withImage && project.meta && <p className="card-meta">{project.meta}</p>}
      </div>
    </Link>
  );
}
