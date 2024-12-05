import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "npm:sequelize-typescript";
import ProductModel from "../../../product/repository/sequelize/product.model.ts";
import OrderModel from "./order.model.ts";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column(DataType.STRING)
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false, type: DataType.STRING })
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false, type: DataType.STRING })
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare quantity: number;

    @Column({ allowNull: false, type: DataType.STRING })
    declare name: string;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare price: number;
}
