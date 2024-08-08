import React, { useState, useRef, useCallback } from 'react';

const useAsyncState = (initialValue) => {
    const [state, setState] = useState(initialValue);
    const resolverRef = useRef(null);

    const asyncSetState = useCallback((value) => {
        return new Promise((resolve) => {
            resolverRef.current = resolve;
            setState(value);
        });
    }, []);

    React.useEffect(() => {
        if (resolverRef.current) {
            resolverRef.current(state);
            resolverRef.current = null;
        }
    }, [state]);

    return [state, asyncSetState];
};

export default useAsyncState;