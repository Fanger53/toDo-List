import './style.scss';
import { render, defaultProject, defaultTask } from './modules/logic';
import { listeners } from './modules/listeners';

listeners();
defaultProject();
defaultTask();
render();