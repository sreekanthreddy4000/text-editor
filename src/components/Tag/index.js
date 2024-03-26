const Tag = ({tag, active, onClick}) => {
  const handleClick = () => {
    onClick(tag.optionId)
  }

  return (
    <li>
      <option value={tag.optionId} onClick={handleClick} selected={active}>
        {tag.displayText}
      </option>
    </li>
  )
}

export default Tag
