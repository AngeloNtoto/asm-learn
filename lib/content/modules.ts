import { Module } from '../types';
import { basicsModules } from './modules/basics';
import { intermediateModules } from './modules/intermediate';
import { advancedModules } from './modules/advanced';
import { linuxModules } from './modules/linux';
import { demystificationModules } from './modules/demystification';

export const MODULES: Module[] = [
  ...basicsModules,
  ...intermediateModules,
  ...advancedModules,
  ...linuxModules,
  ...demystificationModules
];
