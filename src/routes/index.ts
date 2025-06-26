import { authRouter } from "./auth/auth.route";
import { companyRouter } from "./company/company.route";
import { productRouter } from "./product/product.route";

export const routes = { authRouter, companyRouter, productRouter } as const;
