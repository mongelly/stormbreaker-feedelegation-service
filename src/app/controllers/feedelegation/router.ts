import FeeDelegationController from "./controller";
import { AuthorizationVerificationMiddleware } from "../../middleware/authorizationVerificationMiddleware";
import { TransactionFilterMiddleware } from "../../middleware/transactionFilterMiddleware";
import { BaseRouter } from "../../../framework/components/baseRouter";
import { RequestInfoVerifyMiddleware } from "../../middleware/requestInfoVerifyMiddleware";

export default class FeeDelegationRouter extends BaseRouter
{
    constructor(env:any){
        super(env);

        let requestInfoVerifyMiddleware = new RequestInfoVerifyMiddleware(env);
        let authorizationVerificationMiddleware = new AuthorizationVerificationMiddleware(env);
        let transactionFilterMiddleware = new TransactionFilterMiddleware(env);
        let feeDelegationController = new FeeDelegationController(env);

        this.post("/sign",
            (ctx,next) => requestInfoVerifyMiddleware.vip201RequestVerify(ctx,next),
            (ctx,next) => authorizationVerificationMiddleware.authorizationVerification(ctx,next),
            (ctx,next) => transactionFilterMiddleware.transactionFilter(ctx,next),
            (ctx,next) => feeDelegationController.sign(ctx,next)
            );
    }
}