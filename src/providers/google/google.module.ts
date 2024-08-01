import { Module } from "@nestjs/common";
import { GoogleOauth2Module } from "./modules/oauth2";
import { GoogleService } from "./google.service";

@Module({
    imports: [GoogleOauth2Module],
    providers: [GoogleService],
    exports: [GoogleService]
})
export class GoogleModule {}