import { UnauthorizedError } from "../../errors"
import { ServerError } from "../../errors/server-error"
import { HttpResponse } from "../../protocols/http"

export const badRequest = (error: Error): HttpResponse => {
    return {
        statusCode: 400,
        body: error
    }

}
export const unauthorized = (): HttpResponse => {
    return {
        statusCode: 401,
        body: new UnauthorizedError()
    }
}

export const serverError = (error: Error) => {
    return {
        statusCode: 500,
        body: new ServerError(error.stack)
    }
}

export const ok = (data: any) => {
    return {
        statusCode: 200,
        body: data
    }
}