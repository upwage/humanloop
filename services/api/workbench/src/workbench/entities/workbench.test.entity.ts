import { EvaluationStatus } from '../../common/enums/workbench_evaluation_status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkbenchTestInputData } from './workbench.test_input_data.entity';

@Entity('workbench_test')
export class WorkbenchTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'text', nullable: true })
  name: string;

  @Column({ name: 'flow_id', type: 'text', nullable: true })
  flowId: string;

  @ManyToOne(
    () => WorkbenchTestInputData,
    (testInputData) => testInputData.workbenchTests,
    {
      nullable: false,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'test_input_data_id' })
  testInputData: WorkbenchTestInputData;

  @Column({ name: 'max_turns', type: 'integer', nullable: true })
  maxTurns: number;

  @Column({ name: 'total_interviews', type: 'integer', nullable: true })
  totalInterviews: number;

  @Column({ name: 'hl_screener_prompt_id', type: 'text', nullable: true })
  hlScreenerPromptId: string;

  @Column({ name: 'hl_persona_prompt_list', type: 'json', nullable: true })
  hlPersonaPromptList: string[];

  @Column({ name: 'hl_evaluation_prompt_list', type: 'json', nullable: true })
  hlEvaluationPromptList: string[];

  @Column({
    name: 'evaluation_status',
    type: 'enum',
    enum: EvaluationStatus,
    nullable: true,
    default: EvaluationStatus.NEW,
  })
  evaluationStatus: EvaluationStatus;

  @Column({ name: 'hl_evaluation_id', type: 'text', nullable: true })
  hlEvaluationId: string;

  @Column({ name: 'hl_evaluation_summary', type: 'json', nullable: true })
  hlEvaluationSummary: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
