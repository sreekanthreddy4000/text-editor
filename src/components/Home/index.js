import {Component} from 'react'
import {v4 as uuidv4} from 'uuid' // Import UUID package
import Task from '../Task'
import Tag from '../Tag'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Home extends Component {
  state = {
    tasks: [],
    taskInput: '',
    selectedTag: '',
    isTagInputVisible: false,
  }

  handleTagClick = tag => {
    this.setState({selectedTag: tag, isTagInputVisible: true})
  }

  handleInputChange = event => {
    this.setState({taskInput: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const {taskInput, selectedTag} = this.state
    if (taskInput.trim() !== '') {
      const newTask = {
        id: uuidv4(), // Generate unique id using UUID
        taskText: taskInput,
        tag: selectedTag,
      }
      this.setState(prevState => ({
        tasks: [...prevState.tasks, newTask],
        taskInput: '',
        selectedTag: '',
        isTagInputVisible: false,
      }))
    }
  }

  render() {
    const {tasks, taskInput} = this.state
    const tagsJSX = tagsList.map(tag => (
      <Tag
        key={tag.optionId}
        tag={tag}
        onClick={() => this.handleTagClick(tag.optionId)}
      />
    ))

    return (
      <div>
        <h1>Create a task!</h1>
        {tasks.length === 0 && <p>No Tasks Added Yet</p>}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="taskInput">Task:</label>
          <input
            type="text"
            id="taskInput"
            placeholder="Enter the task here"
            value={taskInput}
            onChange={this.handleInputChange}
          />
          <label htmlFor="tagSelect">Tags:</label>
          <select id="tagSelect">
            {tagsList.map(tag => (
              <option key={tag.optionId} value={tag.optionId}>
                {tag.displayText}
              </option>
            ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
        <>
          <h1>Tags</h1>
          <ul>{tagsJSX}</ul>
          <h1>Tasks</h1>
          {tasks.length > 0 && (
            <ul>
              {tasks.map(task => (
                <Task key={task.id} task={task} />
              ))}
            </ul>
          )}
        </>
      </div>
    )
  }
}

export default Home
