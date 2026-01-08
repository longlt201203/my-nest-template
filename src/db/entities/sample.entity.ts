import { ColumnNames, TableNames } from "@db/db.constants";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity(TableNames.Sample)
export class Sample {
	@PrimaryGeneratedColumn("increment", { name: ColumnNames.Sample.id })
	id: number;

	@Column({ name: ColumnNames.Sample.name })
	name: string;

	@Column({ name: ColumnNames.Sample.age })
	@Index(ColumnNames.Sample.age)
	age: number;
}
