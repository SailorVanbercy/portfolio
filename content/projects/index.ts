import type { Project } from '../../src/lib/content/schema';
import arborescence from './arborescence';
import cliniktime from './cliniktime';
import jobTracker from './job-tracker';
import leadboy from './leadboy';
import planFinancier from './plan-financier';
import smaatch from './smaatch';
import tetrisFormation from './tetris-formation';
import theLostGrimoire from './the-lost-grimoire';

export const projects: Project[] = [leadboy, smaatch, tetrisFormation, planFinancier, jobTracker, arborescence, theLostGrimoire, cliniktime];
