import '@fortawesome/fontawesome-free/js/all';

import { addTask,
    addTaskToContainer,
    clearTaskContainer,
    createNewTaskButton 
} from './DOMcontroller';

import './styles.css';
import { newTask } from './task';
import { newTaskList, getTaskLists, getTasks, addTaskToTaskList } from './taskLists';

createNewTaskButton();