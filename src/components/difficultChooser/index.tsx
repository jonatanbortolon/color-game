import { Difficult } from '@/types/difficult'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useGame } from '@/hooks/useGame'
import { Separator } from '../ui/separator'

export function DifficultChooserComponent() {
  const { isStarted, difficult, changeDifficult } = useGame()

  function onDifficultChange(difficult: Difficult) {
    changeDifficult(difficult)
  }

  return (
    <RadioGroup
      className="w-full flex"
      defaultValue={difficult}
      onValueChange={onDifficultChange}
      disabled={isStarted}
    >
      <div className="w-full flex items-center space-x-2">
        <RadioGroupItem className="peer hidden" value="easy" id="r1" />
        <Label
          className="w-full h-full text-center p-2 peer-aria-checked:bg-accent-foreground peer-aria-checked:text-primary-foreground rounded-md cursor-pointer hover:bg-accent"
          htmlFor="r1"
        >
          Easy
        </Label>
      </div>
      <Separator orientation="vertical" />
      <div className="w-full flex items-center space-x-2">
        <RadioGroupItem className="peer hidden" value="medium" id="r2" />
        <Label
          className="w-full h-full text-center p-2 peer-aria-checked:bg-accent-foreground peer-aria-checked:text-primary-foreground rounded-md cursor-pointer hover:bg-accent"
          htmlFor="r2"
        >
          Medium
        </Label>
      </div>
      <Separator orientation="vertical" />
      <div className="w-full flex items-center space-x-2">
        <RadioGroupItem className="peer hidden" value="hard" id="r3" />
        <Label
          className="w-full h-full text-center p-2 peer-aria-checked:bg-accent-foreground peer-aria-checked:text-primary-foreground rounded-md cursor-pointer hover:bg-accent"
          htmlFor="r3"
        >
          Hard
        </Label>
      </div>
    </RadioGroup>
  )
}
