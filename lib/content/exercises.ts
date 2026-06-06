import { Exercise } from '../types';
import { basicsExercises } from './exercises/basics';
import { intermediateExercises } from './exercises/intermediate';
import { advancedExercises } from './exercises/advanced';
import { linuxExercises } from './exercises/linux';
import { demystificationExercises } from './exercises/demystification';

export const EXERCISES: Exercise[] = [
  ...basicsExercises,
  ...intermediateExercises,
  ...advancedExercises,
  ...linuxExercises,
  ...demystificationExercises
];
