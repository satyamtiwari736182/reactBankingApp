export const localStorageMock = (() => {
    let store = {
        user: '{"token":"anytoken","userId":"test","walletId":"123test"}'
    };

    return {
        getItem: (key) => store[key] || null,
        key: (ke) => "user",
        setItem: (key, value) => {
            store[key] = value;
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();