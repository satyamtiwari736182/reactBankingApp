import { rest } from 'msw'

export const handlers = [
    rest.post('http://localhost:8080/api/user/signup', (req, res, ctx) => {
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
            ctx.status(201),
        )
    }),
    rest.post('http://localhost:8080/api/user/login', (req, res, ctx) => {
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
            ctx.status(200),
            ctx.json({
                jwtToken: "1234hjgfjs",
                userId: "user123",
                walletId: "123user"
            })
        )
    }),

    rest.post('http://localhost:8080/api/user/wallet', (req, res, ctx) => {
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
            ctx.status(201),
            ctx.json({
                walletId: "123user"
            })
        )
    }),

    rest.post('http://localhost:8080/api/user/wallet/transaction/transfer', (req, res, ctx) => {
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
            ctx.status(200),
        )
    }),

    rest.post('http://localhost:8080/api/user/wallet/transaction', (req, res, ctx) => {
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
            ctx.status(200),
        )
    }),


    // GET http://localhost:8080/api/user/wallet/123test

    rest.get('http://localhost:8080/api/user/wallet/123test', (req, res, ctx) => {
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: "123",
                    amount: 100,
                    category: "RECHARGE",
                    dateTime: "20th July,2023"
                }
            ]),
        )
    }),

    rest.get('http://localhost:8080/api/user/transaction/123test', (req, res, ctx) => {
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: "123",
                    amount: 100,
                    category: "RECHARGE",
                    dateTime: "20th July,2023"
                }
            ]),
        )
    }),
]