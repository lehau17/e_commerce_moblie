import { IsInt } from "class-validator"

export class CreateOrderDto {
    @IsInt()
    payment_method_id: number
    @IsInt()

    address_id: number
}
