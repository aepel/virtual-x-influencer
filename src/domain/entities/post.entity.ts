export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export class Post {
  constructor(
    private readonly _id: string,
    private readonly _threadId: string,
    private readonly _topicId: string,
    private readonly _content: string,
    private readonly _order: number,
    private readonly _status: PostStatus,
    private readonly _twitterId?: string,
    private readonly _scheduledAt?: Date,
    private readonly _publishedAt?: Date,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get threadId(): string {
    return this._threadId;
  }

  get topicId(): string {
    return this._topicId;
  }

  get content(): string {
    return this._content;
  }

  get order(): number {
    return this._order;
  }

  get status(): PostStatus {
    return this._status;
  }

  get twitterId(): string | undefined {
    return this._twitterId;
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

  static create(
    threadId: string,
    topicId: string,
    content: string,
    order: number,
  ): Post {
    return new Post(
      crypto.randomUUID(),
      threadId,
      topicId,
      content,
      order,
      'draft',
      undefined,
      undefined,
      undefined,
      new Date(),
      new Date(),
    );
  }

  schedule(scheduledAt: Date): Post {
    return new Post(
      this._id,
      this._threadId,
      this._topicId,
      this._content,
      this._order,
      'scheduled',
      this._twitterId,
      scheduledAt,
      this._publishedAt,
      this._createdAt,
      new Date(),
    );
  }

  publish(twitterId: string): Post {
    return new Post(
      this._id,
      this._threadId,
      this._topicId,
      this._content,
      this._order,
      'published',
      twitterId,
      this._scheduledAt,
      new Date(),
      this._createdAt,
      new Date(),
    );
  }

  markAsFailed(): Post {
    return new Post(
      this._id,
      this._threadId,
      this._topicId,
      this._content,
      this._order,
      'failed',
      this._twitterId,
      this._scheduledAt,
      this._publishedAt,
      this._createdAt,
      new Date(),
    );
  }
}
