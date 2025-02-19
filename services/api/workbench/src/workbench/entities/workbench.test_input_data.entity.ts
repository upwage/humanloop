import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkbenchTest } from './workbench.test.entity';

@Entity('workbench_test_input_data')
export class WorkbenchTestInputData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  @ManyToOne(() => WorkbenchTestInputData, (parent) => parent.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parentId: WorkbenchTestInputData | null;

  @Column({ name: 'name', type: 'text', nullable: true })
  name: string;

  @Column({ name: 'version_number', type: 'integer', nullable: true })
  versionNumber: number;

  @Column({ name: 'version_description', type: 'text', nullable: true })
  versionDescription: string;

  @Column({ name: 'basic_information', type: 'json', nullable: true })
  basicInformation: any;

  @Column({ name: 'statements', type: 'json', nullable: true })
  statements: any;

  @Column({ name: 'questions', type: 'json', nullable: true })
  questions: any;

  // In Test entity
  @OneToMany(
    () => WorkbenchTest,
    (workbenchTest) => workbenchTest.testInputData,
    { nullable: true },
  )
  workbenchTests: WorkbenchTest[] | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
