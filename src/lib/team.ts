import type { Project } from './content/schema';
import { format, type Dictionary } from './dictionary';

export function teamLabel(team: Project['team'], dict: Dictionary): string {
  if (team.solo) return dict.project.solo;
  return team.size ? format(dict.project.teamOf, { n: team.size }) : dict.project.group;
}
