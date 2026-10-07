export function SectionHeading({
  title,
  intro,
  as: Tag = 'h2',
  id,
}: {
  title: string;
  intro?: string;
  as?: 'h1' | 'h2';
  id?: string;
}) {
  return (
    <div className="mb-10">
      <Tag
        id={id}
        className={`font-display font-semibold tracking-tight ${Tag === 'h1' ? 'text-4xl sm:text-6xl' : 'text-2xl sm:text-3xl'}`}
      >
        {title}
      </Tag>
      {intro && <p className="mt-3 max-w-2xl text-lg text-muted">{intro}</p>}
    </div>
  );
}
