import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MailModule } from "../mail/mail.module";
import { ShoppingListsController } from "./shopping-lists.controller";
import { ShoppingListsService } from "./shopping-lists.service";

@Module({
  imports: [AuthModule, MailModule],
  controllers: [ShoppingListsController],
  providers: [ShoppingListsService]
})
export class ShoppingListsModule {}
