
import { useEffect, useState } from 'react';
import './TextFieldWithDebounce.css'
import { SearchMiniIcon } from '@/ui/Icons';

const TextFieldWithDebounce = ({delay, onChange, ...props}: any) => {
    const [value, setValue] = useState<string>(props.value)
    const [timer, setTimer] = useState<any>(null)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const onChangeValue = (e: any) => {
        const value = e.target.value
        setValue(value)

        if (timer) {
            clearTimeout(timer)
            setTimer(null)
        }

        const newTimer = setTimeout(() => {
            onChange(value)
            setTimer(null)
            return () => clearTimeout(newTimer)
        }, delay)

        setTimer(newTimer)
    }

    return (
        <div className='textfield'>
            <SearchMiniIcon />
            <input
                {...props}
                type="text"
                value={value}
                onChange={onChangeValue}
                placeholder='Search'
                className='textfield_input'
            />
        </div>
    )
}

export default TextFieldWithDebounce;
