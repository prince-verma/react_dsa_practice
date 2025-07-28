import React, { useRef, useState } from "react";

// simple task manager app in React Native with the following features:
//  Add a Task: The user can input a task name and click "Add Task" to add it to the list.
//  Display Tasks: All tasks are displayed in a list, with alternating colors for even and odd indexed tasks.
// Delete a Task: Each task in the list has a "Delete" button that removes the task from the list.

type Task = string
type TaskList = Task[]

function TodoList() {

  const inputRef = useRef<HTMLInputElement>(null)
  const [list, addToList]: [TaskList, any] = useState([])

  const handleDelete = (index: number) => (): void => {
    list.splice(index, 1)
    addToList([...list])
  }

  const handleAddToLIst = () => {
    if (!inputRef.current) return
    const task: Task | null = inputRef.current.value
    if (!task) return
    inputRef.current.value = ""
    addToList((tasks: TaskList) => {
      // tasks.push(task)
      return [...tasks, task]
    })
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleAddToLIst}>add To list</button>
      {
        list.map((item, index) => {
          return (
            <div key={item + index}>
              {item}
              <button onClick={handleDelete(index)}>delete</button>
            </div>
          )
        })
      }
    </>
  );
}

export default TodoList;
