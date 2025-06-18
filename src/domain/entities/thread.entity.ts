export type ThreadStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export class Thread {
  constructor(
    private readonly _id: string,
    private readonly _topicId: string,
    private readonly _title: string,
    private readonly _status: ThreadStatus,
    private readonly _scheduledAt?: Date,
    private readonly _publishedAt?: Date,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get topicId(): string {
    return this._topicId;
  }

  get title(): string {
    return this._title;
  }

  get status(): ThreadStatus {
    return this._status;
  }

  get scheduledAt(): Date | undefined {
    return this._scheduledAt;
  }

  get publishedAt(): Date | undefined {
    return this._publishedAt;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  static create(topicId: string, title: string): Thread {
    return new Thread(
      crypto.randomUUID(),
      topicId,
      title,
      'draft',
      undefined,
      undefined,
      new Date(),
      new Date(),
    );
  }

  schedule(scheduledAt: Date): Thread {
    return new Thread(
      this._id,
      this._topicId,
      this._title,
      'scheduled',
      scheduledAt,
      this._publishedAt,
      this._createdAt,
      new Date(),
    );
  }

  publish(): Thread {
    return new Thread(
      this._id,
      this._topicId,
      this._title,
      'published',
      this._scheduledAt,
      new Date(),
      this._createdAt,
      new Date(),
    );
  }

  markAsFailed(): Thread {
    return new Thread(
      this._id,
      this._topicId,
      this._title,
      'failed',
      this._scheduledAt,
      this._publishedAt,
      this._createdAt,
      new Date(),
    );
  }
}
