import type { TaskStatus } from '../types/task';

type TasksFilter = 'all' | TaskStatus;

type TaskFilterProps = {
    setFilter: (value: TasksFilter) => void;
    filter: TasksFilter;
};

function TaskFilter({ setFilter, filter }: TaskFilterProps) {
    const getClass = (value: TasksFilter) =>
        filter == value
            ? `tasks-filter__btn ${value} active`
            : `tasks-filter__btn ${value}`;

    return (
        <div className="tasks-filter">
            <p className="tasks-filter__title">Filter Tasks</p>
            <button
                className={getClass('all')}
                onClick={() => setFilter('all')}
            >
                All
            </button>
            <button
                className={getClass('done')}
                onClick={() => setFilter('done')}
            >
                Done
            </button>
            <button
                className={getClass('in-progress')}
                onClick={() => setFilter('in-progress')}
            >
                In Progress
            </button>
            <button
                className={getClass('todo')}
                onClick={() => setFilter('todo')}
            >
                Todo
            </button>
        </div>
    );
}

export default TaskFilter;
