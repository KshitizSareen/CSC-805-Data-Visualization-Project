export const imageURLSState = {
    isArray: true,
    style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    data: [
        {
            isArray: true,
            style: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            data: [
                {
                    isArray: false,
                    width: 30,
                    height: 33,
                    key: 0
                },
                {
                    isArray: true,
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    data: [
                        {
                            isArray: false,
                            width: 20,
                            height: 16.5,
                            key: 1
                        },
                        {
                            isArray: false,
                            width: 20,
                            height: 16.5,
                            key: 2
                        },
                    ]
                }
            ]
        },
        {
            isArray: true,
            style: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            data: [
                {
                    isArray: true,
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    data: [
                        {
                            isArray: false,
                            width: 20,
                            height: 16.5,
                            key: 3
                        },
                        {
                            isArray: false,
                            width: 20,
                            height: 16.5,
                            key: 4
                        },
                    ]
                },
                {
                    isArray: false,
                    width: 30,
                    height: 33,
                    key: 5
                }
            ]
        },
        {
            isArray: true,
            style: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            data: [
                {
                    isArray: true,
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    data: [
                        {
                            isArray: false,
                            width: 25,
                            height: 16.5,
                            key: 6
                        },
                        {
                            isArray: false,
                            width: 25,
                            height: 16.5,
                            key: 7
                        },
                    ]
                },
                {
                    isArray: true,
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    data: [
                        {
                            isArray: false,
                            width: 25,
                            height: 16.5,
                            key: 8
                        },
                        {
                            isArray: false,
                            width: 25,
                            height: 16.5,
                            key: 9
                        },
                    ]
                }
            ]
        }
    ]
}

const initialImagePositions = []

for (let i = 0; i < 10; i++) {
    initialImagePositions[i] = "";
}

export { initialImagePositions };
