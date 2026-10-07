import { STACK_LAYERS, type Project } from '@/lib/content/schema';
import { getSkill } from '@/lib/content/queries';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';

export function StackList({ project, locale }: { project: Project; locale: Locale }) {
  const dict = getDictionary(locale);
  const layers = STACK_LAYERS.filter((layer) => project.stack[layer]?.length);
  return (
    <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
      {layers.map((layer) => {
        const headingId = `stack-${layer}`;
        return (
          <div key={layer} role="group" aria-labelledby={headingId} className="border-t border-border pt-3">
            <h3 id={headingId} className="text-sm font-medium text-muted">
              {dict.project.layers[layer]}
            </h3>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
              {(project.stack[layer] ?? []).map((id) => (
                <li key={id} className="text-[15px]">
                  {getSkill(id).label}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
