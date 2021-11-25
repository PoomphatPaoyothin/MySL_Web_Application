import { Inject, Injectable } from "@nestjs/common";
import { extend } from "@nestjs/graphql/dist/utils";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){}