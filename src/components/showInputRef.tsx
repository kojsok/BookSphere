import { useRef } from "react"

export const ShowInputRef = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    if (inputRef.current) {
      alert(`Input ref value is: ${inputRef.current.value}`)
    }
  }

  // Обработчик для фокусировки на input
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };


  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Show me input ref value</button>
      <button onClick={focusInput}>Фокус на инпут</button>
    </div>
  )
}
