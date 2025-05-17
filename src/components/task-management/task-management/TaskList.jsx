import React from 'react';
import { PlusCircle } from 'lucide-react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onTaskClick, onCreateTask }) => {
  // Group tasks by status
  const tasksByStatus = {
    not_started: tasks.filter(task => task.status === 'not_started'),
    in_progress: tasks.filter(task => task.status === 'in_progress'),
    review: tasks.filter(task => task.status === 'review'),
    completed: tasks.filter(task => task.status === 'completed')
  };

  const getStatusHeader = (status) => {
    switch(status) {
      case 'not_started': return 'Not Started';
      case 'in_progress': return 'In Progress';
      case 'review': return 'Under Review';
      case 'completed': return 'Completed';
      default: return '';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'not_started': return 'bg-slate-200 dark:bg-slate-700';
      case 'in_progress': return 'bg-blue-100 dark:bg-blue-900';
      case 'review': return 'bg-amber-100 dark:bg-amber-900';
      case 'completed': return 'bg-green-100 dark:bg-green-900';
      default: return 'bg-slate-200 dark:bg-slate-700';
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
      {['not_started', 'in_progress', 'review', 'completed'].map(status => (
        <div key={status} className="bg-white dark:bg-dark-box border border-dark-box border-opacity-5 rounded-md shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} mr-2`}></div>
              <h3 className="font-medium text-gray-900 dark:text-dark-text-color">
                {getStatusHeader(status)} ({tasksByStatus[status].length})
              </h3>
            </div>
            
            {status === 'not_started' && (
              <button 
                onClick={onCreateTask}
                className="text-button-bg hover:text-button-bg/80 transition-colors p-1"
              >
                <PlusCircle size={20} />
              </button>
            )}
          </div>
          
          <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-220px)]">
            {tasksByStatus[status].length > 0 ? (
              tasksByStatus[status].map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onClick={onTaskClick} 
                />
              ))
            ) : (
              <div className="text-center p-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-md">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {status === 'not_started' 
                    ? 'Click + to add a new task' 
                    : 'No tasks here yet'}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;