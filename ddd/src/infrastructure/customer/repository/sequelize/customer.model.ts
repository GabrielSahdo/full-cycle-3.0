import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from "npm:sequelize-typescript";

@Table({
    tableName: "customers",
    timestamps: false,
})
export default class CustomerModel extends Model {
    @PrimaryKey
    @Column(DataType.STRING)
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare name: string;

    @Column({ allowNull: true, type: DataType.STRING })
    declare street: string;

    @Column({ allowNull: true, type: DataType.STRING })
    declare number: string;

    @Column({ allowNull: true, type: DataType.STRING })
    declare zipcode: string;

    @Column({ allowNull: true, type: DataType.STRING })
    declare city: string;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    declare active: boolean;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare rewardPoints: number;
}
