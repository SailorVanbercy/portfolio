import type { Project } from '../../src/lib/content/schema';
import jobTracker from './job-tracker';
import leadboy from './leadboy';
import planFinancier from './plan-financier';
import smaatch from './smaatch';
import tetrisFormation from './tetris-formation';

export const projects: Project[] = [leadboy, smaatch, tetrisFormation, planFinancier, jobTracker];
