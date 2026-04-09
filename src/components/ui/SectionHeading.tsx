import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleNode,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleNode?: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-xs font-medium tracking-[0.2em] text-neutral-400">
          {eyebrow.toUpperCase()}
        </p>
      ) : null}
      <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {titleNode ?? title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-pretty text-base leading-[1.7] text-neutral-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}

