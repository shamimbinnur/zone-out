import GitHubStartButton from '../common/GitHubStartButton'
import InfoPopover from './InfoDropDown'

const Menu = () => {
  return (
    <div className="absolute flex items-center w-full justify-between px-8 py-8">
      <GitHubStartButton  />
      <InfoPopover />
    </div>
  )
}

export default Menu