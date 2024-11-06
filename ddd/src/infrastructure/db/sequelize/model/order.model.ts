import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "npm:sequelize-typescript";
import CustomerModel from "./customer.model.ts";
import OrderItemModel from "./order-item.model.ts";

@Table({
    tableName: "order",
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column(DataType.STRING)
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false, type: DataType.STRING })
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare total: number;
}
