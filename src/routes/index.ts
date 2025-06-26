import { authRouter } from "./auth/auth.route";
import { companyRouter } from "./company/company.route";

export const routes = { authRouter, companyRouter } as const
