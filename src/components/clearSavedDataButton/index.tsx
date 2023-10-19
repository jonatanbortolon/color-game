import { Button } from "../ui/button";

export function ClearSavedDataButtonComponent() {
    function onClearClick() {
        localStorage.clear()

        location.reload()
    }

    return <Button variant='link' onClick={onClearClick}>Clear saved data!</Button>
}