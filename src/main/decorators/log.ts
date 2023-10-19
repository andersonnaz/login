import { Controller, HttpRequest, HttpResponse } from "../../application/protocols";
import { LogErrorRepository } from "../../data/protocols/log-error-repository";

export class LogControllerDecorator implements Controller {
    private readonly controller: Controller
    private readonly logErrorRepository: LogErrorRepository

    constructor(controller: Controller, logErrorrepository: LogErrorRepository){
        this.controller = controller
        this.logErrorRepository = logErrorrepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = await this.controller.handle(httpRequest)
        if(httpResponse.statusCode === 500){
            await this.logErrorRepository.logError(httpResponse.body.stack)
        }
        return httpResponse
    }
}