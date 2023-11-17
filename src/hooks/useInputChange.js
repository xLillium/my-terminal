const useInputChange = (inputRef, setInput) => {
    return (e) => {
        setInput(e.target.value);
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        inputRef.current.rows = 1;
    };
}

export default useInputChange;
