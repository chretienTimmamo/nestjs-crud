import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler/dist/throttler.guard.js";


@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
    protected getTracker(req: Record<string, any>): Promise<string> {
       return req.ips.length ? req.ips[0] : req.ip;
    }
}