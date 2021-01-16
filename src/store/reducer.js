import * as actionTypes from './actionTypes';

const defaultState = {
    tasks: [],
    task: null,
    errorMessage: null,
    successMessage: null,
    addTaskSuccess: false,
    removeTasksSuccess: false,
    editTaskSuccess: false,
    sendFormSuccess: false,
    form: [],
    loading: false,
  };
  
  const reducer = (state = defaultState, action)=>{
    switch(action.type){
    case actionTypes.LOADING : {
        return {
            ...state,
            loading: true,
            addTaskSuccess: false,
            removeTasksSuccess: false,
            editTaskSuccess: false,
            errorMessage: null,
            successMessage: null
        };
    }

    case actionTypes.ERROR : {
        return {
          ...state,
          errorMessage: action.error,
          loading: false
        };
    }

    case actionTypes.GET_TASKS_SUCCESS : {
        return {
            ...state,
            tasks: action.tasks,
            loading: false
        };
    }

    case actionTypes.ADD_TASK_SUCCESS : {
        const tasks = [...state.tasks, action.task];
        return {
            ...state,
            tasks: tasks,
            loading: false,
            successMessage: 'Task added successfully!!!',
            addTaskSuccess: true
        };
    }

    case actionTypes.REMOVE_TASK_SUCCESS : {
        if(action.from === 'single') {
            return {
                ...state,
                task: null,
                loading: false,
                successMessage: 'Task removed successfully!!!',
            };
        }
        
            const newTasks = state.tasks.filter(task => task._id !== action.taskId);
            return {
                ...state,
                tasks: newTasks,
                loading: false,
                successMessage: 'Task removed successfully!!!',
            };
        

    }

    case actionTypes.EDIT_TASK_SUCCESS : {
        if(action.from === 'single') {
            return {
                ...state,
                loading: false,
                editTaskSuccess: true,
                task:action.task,
                successMessage: 'Task edited successfully!!!',
            };
        }
        else {
            const tasks = [...state.tasks];
            const foundTaskIndex = tasks.findIndex((task) => task._id === action.task._id);
    
            tasks[foundTaskIndex] = action.task;

            return {
                ...state,
                loading: false,
                editTaskSuccess: true,
                tasks:tasks,
                successMessage: 'Task edited successfully!!!',
            };
        }
    }

    case actionTypes.CHANGE_TASK_STATUS_SUCCESS : {
        let message;
        if(action.task.status === 'done') {
            message = 'Congradulations, task completed!!!';
        }
        else {
            message = 'The task is active now!!!';
        }

        if(action.from === 'single') {
            return {
                ...state,
                loading: false,
                editTaskSuccess: true,
                task: action.task,
                successMessage: message,
            };
        }
        else {
            const tasks = [...state.tasks];
            const foundTaskIndex = tasks.findIndex((task) => task._id === action.task._id);
    
            tasks[foundTaskIndex] = action.task;

            return {
                ...state,
                loading: false,
                editTaskSuccess: true,
                tasks:tasks,
                successMessage: message,
            };
        }
    }

    case actionTypes.REMOVE_SELECTED_TASKS_SUCCESS : {

        let tasks = [...state.tasks];
        action.taskIds.forEach((id)=>{
            tasks = tasks.filter((task)=>task._id !== id)
        });

        return {
            ...state,
            tasks: tasks,
            removeTasksSuccess: true,
            loading: false,
            successMessage: 'Tasks removed successfully!!!',
        };
    }

    case actionTypes.GET_SINGLE_TASK_SUCCESS : {
        return {
            ...state,
            task: action.task,
            loading: false
        };
    }

    case actionTypes.SEND_FORM_SUCCESS : {
        return {
            ...state,
            loading: false,
            successMessage: 'Form sent successfully!!!',
            sendFormSuccess: true
        };
    }

    default: return state;
    }
  };

  export {reducer}
